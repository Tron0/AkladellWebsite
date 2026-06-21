'use strict';

function createUpdatePost(title, content, date)
{
    // Create elements
    var post = document.createElement('div');
    post.className = 'post';
    post.id = createUpdateId({ title: title, date: date });
    var postTitle = document.createElement('h2');
    var postContent = document.createElement('div');  // Change to div
    var postDate = document.createElement('small');
    // Set content
    postTitle.textContent = title;
    postContent.innerHTML = content.replace(/\n/g, '<br>');  // Replace newlines with <br>
    postDate.textContent = date;
    // Append elements
    post.appendChild(postTitle);
    post.appendChild(postContent);
    post.appendChild(postDate);
    // Return the post
    return post;
}

function createUpdateId(post)
{
    return 'update-' + post.date.slice(0, 10) + '-' + post.title
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function escapeHtml(value)
{
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function createRecentUpdatesMarkup(limit)
{
    var posts = getUpdatePosts().slice(0, limit);
    var items = posts.map(function(post)
    {
        var postId = createUpdateId(post);
        var date = post.date.slice(0, 10);
        return `
            <li>
                <a href="#updates#${postId}">${escapeHtml(post.title)}</a>
                <time datetime="${date}" title="${escapeHtml(post.date)}">${date}</time>
            </li>
        `;
    }).join('');

    return `
        <section class="recent-updates" aria-labelledby="recent-updates-title">
            <h2 id="recent-updates-title">Recent Updates</h2>
            <ol>
                ${items}
            </ol>
            <a class="recent-updates-all" href="#updates">Updates Page</a>
        </section>
    `;
}

function loadHomePage()
{
    var mainContent = document.getElementById('content');
    mainContent.className = 'home-page';
    mainContent.innerHTML = `
        <h1>Home Page</h1>
        <div class="home-gif-scene">
            <img class="home-wizard-gif" src="./media/wizard2.gif" alt="">
        </div>
        ${createRecentUpdatesMarkup(5)}
    `;
}

function setupRightPanels() {
    const panel = document.getElementById('right-panel');
    if (!panel) return;

    const tabButtons = Array.from(panel.querySelectorAll('[data-panel-target]'));
    const contentSections = Array.from(panel.querySelectorAll('[data-panel-content]'));
    const closeButtons = Array.from(panel.querySelectorAll('.right-panel-close'));

    const setActivePanel = (name) => {
        panel.dataset.panel = name;
        contentSections.forEach((section) => {
            section.hidden = section.dataset.panelContent !== name;
        });
    };

    const setOpen = (isOpen) => {
        panel.classList.toggle('open', isOpen);
        tabButtons.forEach((button) => {
            button.setAttribute('aria-expanded', String(isOpen && button.dataset.panelTarget === panel.dataset.panel));
        });
    };

    window.closeRightPanel = function()
    {
        setOpen(false);
    };

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetName = button.dataset.panelTarget;
            const isAlreadyOpen = panel.classList.contains('open') && panel.dataset.panel === targetName;
            setActivePanel(targetName);
            setOpen(!isAlreadyOpen);
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setOpen(false);
        }
    });

    setActivePanel(panel.dataset.panel || 'resources');
    setOpen(false);
}

function getSongOfWeek()
{
    var schedule = getSongOfWeekSchedule();
    return schedule ? schedule.song : null;
}

function getSongKey(song)
{
    return (song.youtubeId || song.artist + '-' + song.title).toLowerCase();
}

function getSongLabel(song)
{
    return song.artist ? song.artist + ' - ' + song.title : song.title;
}

function getSongPool()
{
    var seen = {};
    return SONG_OF_WEEK_PLAYLIST.filter(function(song)
    {
        if (!song || !song.title) return false;

        var key = getSongKey(song);
        if (seen[key]) return false;
        seen[key] = true;
        return true;
    });
}

function hashSeed(value)
{
    var hash = 2166136261;
    for (var i = 0; i < value.length; i++) {
        hash ^= value.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function seededRandom(seed)
{
    return function()
    {
        seed += 0x6D2B79F5;
        var value = Math.imul(seed ^ seed >>> 15, 1 | seed);
        value ^= value + Math.imul(value ^ value >>> 7, 61 | value);
        return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
}

function getSongAddedWeek(song)
{
    if (!song.added) return 0;

    var dateValue = song.added.indexOf('T') === -1 ? song.added + 'T00:00:00' : song.added;
    var addedDate = new Date(dateValue);
    var startDate = new Date(SONG_OF_WEEK_START_DATE);

    if (Number.isNaN(addedDate.getTime())) {
        return 0;
    }

    return Math.max(0, Math.floor((addedDate.getTime() - startDate.getTime()) / SONG_OF_WEEK_WEEK_MS));
}

function getWeekStartDate(weekIndex)
{
    var startDate = new Date(SONG_OF_WEEK_START_DATE);
    return new Date(startDate.getTime() + weekIndex * SONG_OF_WEEK_WEEK_MS);
}

function formatSongWeekDate(date)
{
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function getCurrentSongWeekIndex()
{
    var startDate = new Date(SONG_OF_WEEK_START_DATE);
    return Math.max(0, Math.floor((Date.now() - startDate.getTime()) / SONG_OF_WEEK_WEEK_MS));
}

function chooseSongForWeek(availableSongs, weekIndex, previousSong)
{
    var random = seededRandom(hashSeed(SONG_OF_WEEK_SEED + ':week:' + weekIndex));
    var songIndex = Math.floor(random() * availableSongs.length);
    var selectedSong = availableSongs[songIndex];

    if (previousSong && availableSongs.length > 1 && getSongKey(selectedSong) === getSongKey(previousSong)) {
        selectedSong = availableSongs[(songIndex + 1) % availableSongs.length];
    }

    return selectedSong;
}

function buildSongScheduleThroughWeek(targetWeek)
{
    var songs = getSongPool();
    var playedKeys = {};
    var previousSong = null;
    var schedule = [];

    for (var weekIndex = 0; weekIndex <= targetWeek; weekIndex++) {
        var eligibleSongs = songs.filter(function(song)
        {
            return getSongAddedWeek(song) <= weekIndex;
        });

        if (!eligibleSongs.length) continue;

        var availableSongs = eligibleSongs.filter(function(song)
        {
            return !playedKeys[getSongKey(song)];
        });

        if (!availableSongs.length) {
            playedKeys = {};
            availableSongs = eligibleSongs;
        }

        var song = chooseSongForWeek(availableSongs, weekIndex, previousSong);
        playedKeys[getSongKey(song)] = true;
        previousSong = song;

        schedule.push({
            song: song,
            weekIndex: weekIndex,
            weekStart: getWeekStartDate(weekIndex)
        });
    }

    return schedule;
}

function getSongOfWeekSchedule()
{
    var schedule = buildSongScheduleThroughWeek(getCurrentSongWeekIndex());
    return schedule.length ? schedule[schedule.length - 1] : null;
}

function getSongHistory()
{
    return buildSongScheduleThroughWeek(getCurrentSongWeekIndex()).reverse();
}

function setupSongOfWeek()
{
    var banner = document.querySelector('.song-of-week-banner');
    var player = document.getElementById('song-of-week-player');
    var closeButton = document.querySelector('.song-of-week-close');
    var nameEl = document.querySelector('[data-song-of-week-name]');
    var metaEl = document.querySelector('[data-song-of-week-meta]');
    var embedEl = document.querySelector('[data-song-of-week-embed]');
    var historyButton = document.querySelector('.song-of-week-history-toggle');
    var historyEl = document.querySelector('[data-song-of-week-history]');
    var schedule = getSongOfWeekSchedule();
    var song = schedule ? schedule.song : null;

    if (!banner || !player || !closeButton || !nameEl || !metaEl || !embedEl || !song) return;

    var songLabel = getSongLabel(song);
    nameEl.textContent = songLabel;
    metaEl.innerHTML = `
        ${song.artist ? `<div class="song-of-week-artist">${escapeHtml(song.artist)}</div>` : ''}
        <div class="song-of-week-track">${escapeHtml(song.title)}</div>
    `;

    if (historyButton && historyEl) {
        historyEl.innerHTML = getSongHistory().map(function(historyItem)
        {
            var historySong = historyItem.song;
            var historyLabel = getSongLabel(historySong);
            return `
                <li>
                    <span>${escapeHtml(formatSongWeekDate(historyItem.weekStart))}</span>
                    <span>${escapeHtml(historyLabel)}</span>
                </li>
            `;
        }).join('');

        historyButton.addEventListener('click', function()
        {
            var isHidden = historyEl.hidden;
            historyEl.hidden = !isHidden;
            historyButton.setAttribute('aria-expanded', String(isHidden));
        });
    }

    var closePlayer = function()
    {
        player.hidden = true;
        banner.setAttribute('aria-expanded', 'false');
        embedEl.innerHTML = '';
    };

    banner.addEventListener('click', function()
    {
        player.hidden = false;
        banner.setAttribute('aria-expanded', 'true');

        if (window.closeRightPanel) {
            window.closeRightPanel();
        }

        if (!embedEl.querySelector('iframe')) {
            if (song.bandcampUrl) {
                embedEl.innerHTML = `<iframe title="${escapeHtml(songLabel)}" src="${song.bandcampUrl}" seamless loading="lazy"></iframe>`;
            } else if (song.youtubeId) {
                embedEl.innerHTML = `
                    <iframe title="${escapeHtml(songLabel)}" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(song.youtubeId)}?rel=0" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                `;
            } else {
                embedEl.innerHTML = '<p class="song-of-week-empty">Add a <code>bandcampUrl</code> or <code>youtubeId</code> to <code>SONG_OF_WEEK_PLAYLIST</code> in <code>app.js</code>.</p>';
            }
        }
    });

    closeButton.addEventListener('click', closePlayer);
}

function loadResourcesPage() {
    var mainContent = document.getElementById('content');
    mainContent.className = 'resources-page';

    mainContent.innerHTML = `
      <div id="resources">
        <h1>Resources</h1>
        <section class="resource-list">
          <article class="resource-item">
            <h2>Akladell PC Sheet</h2>
            <a class="resource-download" href="./media/Akladell%20PC%20Sheet.pdf" target="_blank" rel="noopener">Open PDF</a>
          </article>
        </section>
      </div>
    `;
  }

document.addEventListener('DOMContentLoaded', () => {
    setupRightPanels();
    setupSongOfWeek();

    const spellsLink = document.querySelector('.spells-link');
    if (spellsLink) {
        spellsLink.addEventListener('click', e => {
            e.preventDefault();
            loadContent('#spells');
        });
    }
});
  

function getUpdatePosts()
{
    return [

    
    {

        title: 'Orcs, Infravision, and Training Cap',
        content: `Added Orcs back into the main race list. These are closer to the older OD&D kind than the modern generic version.

        I also added Infravision as a general rule so it is not just a word sitting on a race entry.

        The training rule has also been changed. If a character has enough XP to level but cannot train yet, they can keep earning XP until they are 1 XP short of the level after that. At 10th level and above, characters no longer need training to level.

        <b> Changes: </b>

        - Added Orcs as a main race.
        - Added a general Infravision rule.
        - Changed training so XP is not hard capped at the first untrained level.
        - Characters of 10th level or higher no longer need training.

        `,
        date: "2026-06-21 15:47 CET"
    },


    {

        title: 'More Weapons and Weapon Length',
        content: `Expanded the weapon lists using AD&D/OSRIC/2e references, including additional swords, polearms, thrown weapons, bows, slings, and ammunition.

        <b> Changes: </b>

        - Added weapon length values where they were missing.
        - Added or adjusted speed factors for the new weapons.
        - Added rules for M/L weapons that may be used one-handed with enough Strength, as per OSRIC.
        - Added Hooking and Catching weapon keywords for weapons such as Ranseur, Guisarme, Military Fork, and Mancatcher.

        `,
        date: "2026-06-13 19:20 CET"
    },


    { 

        title: 'Additional Benefits to Inhuman Ability Scores',
        content: `Wrote down more mechanics that does occur once a character enters an extended ability score table. Things like regeneration in con, or spell immunity for wisdom. 

        <b> Changes: </b>

        - Added 19+ Intelligence illusion immunity.
        - Added 19+ Constitution health regeneration.
        - Added 19+ Wisdom immunity of certain named spells. 
        - Described what previous "bonus spells" actually means for Law Mages. It's now renamed "Extra Daily Slots" for easier wording.
        - Changed the appearance of the website.

        `,
        date: "2026-06-10 18:23 CET"
    },


    { 

        title: 'THAC0, Armor Class Overhaul',
        content: `A convert to make the rules sit closer to AD&D, and for some more old school fun. The biggest visible change is that combat now uses descending Armor Class throughout, with THAC0 listed directly beneath each class' to-hit table.

        Ability scores now follow the old school order, scores beyond 18 have their own extended tables, and the background table has been reshaped a bit.

        <b> Changes: </b>

        - Added THAC0 tables.
        - Converted armor to descending Armor Class.
        - Expanded the armor list with AD&D/2e armor types.
        - Rebalanced hide armor as medium armor with higher weight and cost.
        - Reordered ability scores to Strength, Intelligence, Wisdom, Dexterity, Constitution, and Charisma.
        - Expanded ability score to 19+ score tables.
        - More backgrounds and descriptions.
        - Added Read Languages as a Specialist skill as described in 1e.
        - Added Read Scrolls at Specialist level 10, with misread chance equal to 25% minus Intelligence score.
        - Added a Resources tab with a downloadable PC Sheet.
        - Added a Climb column to the Specialist advancement table.
        - Specialists use the better of their Strength Climb chance or listed Specialist Climb chance when a dangerous climb requires a roll.

        `,
        date: "2026-06-09 19:13 CET"
    },

    {

        title: 'Additional Races + Free Henchmen Training',
        content: `After scouring the ancient scripts of the internets, I did find that henchmen are not supposed to be granted free paid training, they instead need to pay for it with their own silver. 
        
        This makes more sense as I've noticed the economy being rough for a few player characters, even with adequate loot. A good way to track if henchmen can actually train would be to write down their shares each session.
        
        As for races, Elves and Avians are now written down in the main document.
        
        <b> Changes: </b>

        - Elves and Avians written down outside of the old unused rules page.
        - Player characters no longer need to pay for henchmen training. Henchmen instead pay for their own training and can level if they have enough currency.  

        `,
        date: "2026-06-05 20:19 CET" 
    },

    { 

        title: 'Fixed Training',
        content: `Training is now balanced to be cheaper in the later levels and more expensive early. Time is now dependent on trainers. It's more akin to the BtB rules in 1e.
        
        <b> Changes: </b>

        - Changed training costs added training time variants.
        - QoL changes in #spells on the site.

        `,
        date: "2026-03-16 16:54 CET" 
    },
    
    { 

        title: 'Simplified Spell Research + Basic Magic Item Creation',
        content: `Made spell research cheaper and easier. Also added some ACKS rulings to have the libraries grow when more coin is put into spell researching. 
        
        <b> Changes: </b>

        - Added rules for basic magic item creation.
        - Changed spell research.

        `,
        date: "2026-02-09 22:50 CET" 
    },

    { 

        title: 'Dual-classing',
        content: `Humans use the dual-classing rules from now on, and demi-humans can only multi-class.
        
        <b> Changes: </b>

        - Added dual-classing rules for humans.
        - Changed multi-classing to be demi-human only.
        - Removed any reference to the five colors magic paradigm as it's not used.

        `,
        date: "2026-01-26 17:10 CET" 
    },

    { 

        title: 'D6 Specialists + Storage',
        content: `Specialists now have a d6 hit die. Different types of storage containers are also added under general items.
        
        <b> Changes: </b>

        - Changed specialist HD from d4 to d6.
        - Added Storage containers.
        - Added beasts of burden, including horses.
        - Added water vessels

        `,
        date: "2025-12-16 16:14 CET" 
    },

    { 

        title: 'Weapon Damage vs Large Creatures',
        content: `Listed in the AD&D 1e PHB is weapon damage vs s/m (small/medium) and vs l (large). Opted not to use it until now but it might add some fun variation.
        
        <b> Changes: </b>

        - Changed some weapon damage in order to line up closer with the PHB.
        - Added weapon damage vs large creatures.

        `,
        date: "2025-11-27 15:15 CET" 
    },

    { 

        title: 'Dolmenwood + Enchanter',
        content: `I just recently got the physical books of the Dolmenwood core bundle and I can definitely say it's one of the most impressive TTRPG settings I've read. Not excusively because of the game content, but because of the layout, ease of use, and attention to detail.

        Dolmenwood exists now as a region north of Draeneria and east of the elves. It's a location which holds more potent magic and overall strangeness, this new class basically reflects that. 

        The enchanter is one of the classes from the book, rewritten in my own words. I think it's a quite interesting class, almost an "anti-cleric" spellsword.  If you decide to roll an enchanter up, it means that you hail from the fairy region around Dolmenwood.
        
        <b> Changes: </b>

        - Added Dolmenwood as a region in the game setting.
        - Added the Enchanter class.
        - Changed a few monk descriptions for clarification.
        
        `,
        date: "2025-10-07 16:05 CET" 
    },
    
    { 

        title: '36th Chamber',
        content: `The Monk is now here, specificially the Oriental Adventures (1985) version. It's a strange class in both how it's written and how it plays, but the cool factor is enough for me as of now.

        After looking at the PHB monk and this one, I think the OA version is better designed. The PHB monk is much weaker on paper, but it also comes with some weird "insta kill" mechanics that I thought was cheap. 
        With that mentioned I thought the simplicity of it was nice. 
        
        Ultimately however I decided to go with the OA monk as it's somewhat crazy. There's a lot of martial abilities you can do each round of combat which might have the consequence of slowing down combat.
        That is why I think anyone who wants to play this should read through it thoroughly. Plan ahead like a true tactician because you won't have time to think in the heat of combat.    
        
        <b> Changes: </b>

        - Added the Monk class.
        
        `,
        date: "2025-09-10 13:02 CET" 
    },
    
    { 

        title: 'Fighter Cleave & Barb subclassing',
        content: `A rule inside the AD&D DMG mentions what some people call "Sweep" attacks. This grants fighters a way to quickly disperse of <1 HD creatures in melee.
        I do think it's a fair thing to give fighters a bit more of "heroicism" when it comes to slaying goblins, however I'm going with a different rule. 
        This is similar in that it grants extra attacks, but only when the PC kills an enemy within range. Only Fighters and Barbarians are given this talent. 

        Barbarians are now also a Fighter subclass, they do not get a melee damage bonus anymore but instead gain exceptional/superior strength.
        
        <b> Changes: </b>

        - Fighters and Barbarians can now "Cleave".
        - Barbarian is now a Fighter subclass.
        - Some of the prerequisite stat requirements are a bit higher for barbarians.
        
        `,
        date: "2025-07-10 20:28 CET" 
    },
    
    { 

        title: 'More languages',
        content: `Optional table added that encompasses a bunch of random monsters, roll it and have fun. In other news, the intelligence and wisdom % to learn spells are slightly lower. 
        The reason for this is that they only go up to 85% in AD&D.
        
        <b> Changes: </b>

        - Added foreign tongue language table.
        - More languages per level under INT.
        - Overall lower % to learn spells under INT and WIS. 
        
        `,
        date: "2025-07-10 16:15 CET" 
    },

    { 

        title: 'Five Save Categories',
        content: `Each class now has five different saving throw categories that scale with level, depending on class. This is slightly different from the S&W base save, just with more variation. 
        Categories have different names. For example: Wands would be magical devices or "dodging missiles" save, breath weapon is large AoE, spell is the same and paralysis/poison is merged with death saves.
            
        
        <b> Changes: </b>

        - Changed saving throw into the 1e categories.
        - Organized to hit scaling per level under each class description on the website.
        
        `,
        date: "2025-06-16 12:27 CET" 
    },

    { 

        title: 'More HP More Problems',
        content: `Health in the negatives has been a little bit annoying for me to keep track of during combat rounds, this and the potential of stronger player characters has left me with two choices: Doing death at 0 and giving PCs max HP at level 1, or the same but with a saving throw while keeping any dismemberment.
        I'm opting for the second one to make it more simple and less predictable as I want to encourage tactics rather than anyone relying on the dice to defeat opposition.
            
        
        <b> Changes: </b>

        - Removing grievous wounds.
        - Removing death at -10 (and henchmen death at -5)
        - Adding unconscious at 0, save or die.
        
        `,
        date: "2025-06-14 19:37 CET" 
    },
    
    { 

        title: 'By the book to-hit per level',
        content: `Organized the "to-hit" per level tables for different classes. Fighters scale faster compared to fighter subclasses such as inquisitor and ranger.
            
        
        <b> Changes: </b>

        - Slightly different to-hit scalings per level. Under "calculating hits per level".
        - Fighters gain +1 to-hit per level.
        - Barbs and fighter subclasses get +2 every other level. For example.
        
        `,
        date: "2025-06-10 10:40 CET" 
    },
    
    { 

        title: 'Library Creation & Schools of Magic',
        content: `Spell research is now more closer to 1e than 2e. It's not fully by the book but close enough. At least one week of spell research needs to be planned out, which makes sense. 
        You can now also create libraries as well. This costs a lot but lowers the long term costs.
            
        
        <b> Changes: </b>

        - Spell research cost lowered.
        - Spell research involves at least one initial week of prepping costs & planning.
        - Added cost and time of creating libraries.
        - Changed spell colors to schools (abjuration, divination, necromantic etc)

        `,
        date: "2025-06-09 11:05 CET" 
    },

    { 

        title: 'Law Mage Scaling',
        content: `Law mage changes. Copying over the charisma table.
            
        
        <b> Changes: </b>

        - Faster law mage spell scaling. 
        - Law mage needs more xp past early levels.
        - Expanded charisma table. Including procentile loyalty. 
        - Changed charisma table "maximum henchmen" to "maximum retainers".
        - Low intelligence PCs can still search :)

        `,
        date: "2025-06-01 01:11 CET" 
    },
    
    { 

        title: 'Carousing & Downtime',
        content: `Writing down some more downtime activities such as training for weapon proficiency, carousing, rodomontade.
            
        
        <b> Changes: </b>

        - Added and sorted downtime activity.
        - Changed henchmen to roll 4d6 dtl (standard stat rolling) instead of 3d6.
        - Better sorted sidebar categories.
        - You can now roll for languages.

        `,
        date: "2025-05-27 22:13 CET" 
    },

    { 

        title: 'Strength, Dex, Con AD&D ability scores',
        content: `To standardize the usage AD&D I've opted to change the physical ability scores to align similarly with the books. Characters who roll average stats will now be more average, and the more exceptional characters will be stronger. The game was designed with 4d6 drop lowest in mind, whereas S&W/OD&D uses 3d6 down the line. The math is different but it won't change the game drastically. Some Conans might definitely show up though.
            
        
        <b> Changes: </b>

        - Copied the AD&D ability scores (STR, DEX, CON) from players handbook.
        - Exceptional strength added to strength table.
        - Dexterity bonuses can be gained by all classes.
        - Higher end of INT gives search bonus.
        - Increased prime attribute experience bonus from 5% to 10%
        - Fighter now has d10 HD instead of d8 as per the book.
        - Changed ranger & inquisitor multiple atttacks to be later than fighter.
        - Removed fighter parry.
        - Removed experience bonuses from intelligence and charisma.

        `,
        date: "2025-05-27 11:32 CET" 
    },

    { 

        title: 'Level 0 henchmen',
        content: `Adding level 0 henchmen, which can be recruited by first level PCs.
            
        
        <b> Changes: </b>

        - Added the description for level 0 henchmen.

        `,
        date: "2025-05-23 21:39 CET" 
    },

    { 

        title: 'Movement changes',
        content: `Increasing the movement speed inside dungeons (both turns and rounds). This ups the pacing quite a bit and lines it up with S&W. Also sorted the movement section better.
            
        
        <b> Changes: </b>

        - Movement table is now more properly described and outlined.
        - Removed overencumbrance.
        - Moved spell slots per level under each class separately.

        `,
        date: "2025-05-15 17:36 CET" 
    },

    { 

        title: 'Silver Standard, Item Stacking',
        content: `The converting of the "gold standard" into a "silver standard" is an idea I've contemplated for some time as many online discussions both note the historical and design flaws this standard introduces to the world economy. (See: <a href="https://deltasdnd.blogspot.com/2010/03/on-money.html?m=1">Delta's D&D Hotspot: On Money</a>)

        While silver was more commonly used in medieval times, my reasoning for this change is mainly in the form of the game design. 

        Copper currently holds little value. As why would you bring back 2,000 copper to just get less than 50 xp? Changing the game to use a silver standard makes this more reasonable while also giving more of a dungeon loot "progression."
          
        
        <b> Changes: </b>

        - Silver is now the new coin standard. Some bookkeeping required for conversion!
        - All items and rules that referenced gold now uses silver.
        - Some items now have different "stacks". For example: Dagger and torch stacks up to 3 instead of 10.
        - Cleared up training to now cost 2% of xp per day instead of week.

        - Changed the coin conversion rate to be more in line with the OD&D rules (1 gp = 10 sp, 1 sp = 5 cp)
        - Changed unarmored travel speed to be the same as lightly armored.
        - Changed "forced march" to always succeed but failing the constitution (changed from strength) check gives exhaustion. You cannot force march if you are exhausted.

        `,
        date: "2025-05-07 10:24 CET" 
    },

    { 

        title: 'Druid & More Law Spells',
        content: `Added the druid and the corresponding level 1 spells. Additionally, because the Seeker's Guild™ now grants law spells to be taught, the names of all law spells have been written up. 
        
        <b> Changes: </b>

        - Druid class added (law mage subclass)
        - Law spell names added.
        - Fighting withdrawal updated, creatures can now switch places with allies and enemies can choose follow the movement (unless blocked).

        `,
        date: "2025-05-04 18:25 CET" 
    },

    { 

        title: 'Pommels & Wisdom Spell Learning',
        content: `Minor changes. Mostly some homebrew pommel business and simplifying training to 3d6. 
        One important thing regarding wisdom now is that law mages can gain an extra daily memorization slot up to 4th level.
        
        <b> Changes: </b>

        - 3d6 for days training
        - Bonus spells for law mages under wisdom are extra daily memorization slots. They do not grant new spells known or add spells to the spellbook.
        - Unarmored AC is now 10, making the curve smoother.
        - Pommel attack with reach weapons, half damage of the weapon damage instead of none.
        - Lowered weapon damage of two-handed spear and pole arm. 
        
        `,
        date: "2025-02-17 11:37 CET" 
    },

    {
        title: 'Training',
        content: `Upkeep is removed and now we use training as a gold sink. I think it's better to have choices cost instead of removing gold every month or session.
        Healing is now also by the AD&D rules, meaning only during downtime. This will make more sense when we go back to 1:1 time.
        
        <b> Changes: </b>

        - Added training rules.
        - Changed healing to downtime only (btb).
        - Removed upkeep. 
        
        `,
        date: "2025-01-29 17:35 CET" 
    },

    { 

        title: 'Site Changes & More Definitions',
        content: `Mostly just site changes (moved spells to a seperate .md file). There's also new rules clarification including facing and what grants bonuses.
        Removing Ranger to-hit bonus with ranged, keeping it simple.

        <b> Changes: </b>
        
        - Added subclass header and definition.
        - Changed flanking and facing bonuses.
        - Changed old age to become slightly more rare.
        - Removing Ranger to-hit bonus with ranged to be in line with the Fighter bonus.
        
        `,
        date: "2025-01-10 20:00 CET" 
    },

    { 

        title: 'End of 2024 Changes',
        content: `God jul! These are the big Christmas and New Year updates. Adding the Ranger subclass from AD&D with multiclass changes, xp changes and more.

        <b> Changes: </b>

        - Added Ranger as a Fighter subclass.
        - Multiple attacks will be granted during charge, same goes for enemies.
        - Removing insanity.
        - Added cool level titles.

        <a>Inquisitor:</a>
            - Removing parry from Inquisitor to be more consistent with Fighter subclasses. (As the Ranger now is).
            - Adding protection from evil aura.
            - Inquisitor now needs to donate adventure earnings until later levels.
        
        <a>Barbarian:</a>
            - Now gains the damage bonus from melee AND heavy thrown weapons.
            - Hear Sound on 3-6.
            - Multiple attacks at 5th level.

        <a>Changed the level progression for the following classes:</a>
        - Illusionist: Less xp needed
        - Specialist: Less xp needed around level 6-10
        - Chaos Mage: Less xp needed later levels

        - Barbarian: More xp needed
        - Inquisitor: More xp needed early levels

        <a>Multiclass Changes:</a>
        - The OSE (Old School Essentials) multiclass rules will now be used.
        - Dual classing is no longer a thing.
        - Multiclassing must be decided at character creation. It is not possible to change or add classes for an already existing character during the campaign.
        - More is explained on the multiclassing tab.
        
        `,
        date: "2024-12-31 15:20 CET" 
    },

    { 

        title: 'Missile Ranges & Stuff',
        content: `Missile weapon ranges now have separate to-hit penalties for short, medium and long range. This has been in place before but now it is written down.

        In other news, we're going back to individual surprise. Barbarian is getting a +1 bonus to the roll instead of being totally immune or giving group bonuses.

        <b> Changes: </b>

        - Missile Weapon ranges explained in the combat section.
        - Back to individual surprise. Remember that the DEX surprise modifier is now back in play as well.
        - Barbarian surprise is now a +1.
        - Added causes of death in the hall of the dead.
        - Removed the rolling gold step in character creation.
        
        `,
        date: "2024-12-12 08:00 CET" 
    },

    { 

        title: 'Details on Spell Research',
        content: `Added details and steps on spell research. It is closer to AD&D now, and generally less expensive.

        <b> Changes: </b>

        - Spell Research patch
        
        `,
        date: "2024-11-19 21:52 CET" 
    },

    { 

        title: 'Rolling for Equipment & Spell Research',
        content: `For the sake of time, you can now roll for starting equipment instead of buying. There's a starting items table specific for each class and one general "starting equipment" table that you role on four times. You also get a couple of generic starting items listed under the starting items caption.

        Spell research rules are also written down. They're generally open-ended because I feel like there's no "true" ruling for how to proceed. But general guidelines are now in place.

        <b> Changes: </b>

        - Magical Research rules
        - Rolling for equipment
        - Removed Barb passive search, but kept the 1-4 active.
        - Changed Barb wording: "Any except ranged" -> "Any except bows/crossbows"
        
        `,
        date: "2024-10-29 18:53 CET" 
    },

    { 

        title: 'Combat Actions & Special Abilities',
        content: `There's now a whole write-up from OSRIC/1e on the different combat actions a character can take. In melee especially. It's mostly the same except for a few differences (highly recommend reading it but here's a short version) 

        - Parrying needs to be declared.
        - Charging and closing into melee is different. Charging doubles movement speed but the defender gets to attack as well. If you decide to close into melee you cannot attack.
        - You can set spears or similar weapons against charges.
        - You need to randomly determine enemy targets when attacking in melee. This is not like missiles where you can target allies however.

        Secondly there's now "Special Abilities" or traits that you can roll for at 1st level. It is taken from "Fight On! #15", which I really liked. It was apparently first an idea from Mark Swanson's Special Abilities "in Alarums &
        Excursions #1" from 1975. Later it was refined from its original concept by David Hargrave who wrote it in "Arduin Grimoire #1" in 1977. There's a lot of very fun ideas in these charts, so I'm dropping it in.


        <b> Changes: </b>

        - Added Melee Actions from OSRIC.
        - Added Special Abilities to roll at 1st level.
        - Changed "Magic Saves" modifier in Wisdom as "Mental Saving Throw Bonus" (versus charm etc)
        - Bonus spells from Wisdom lowered to a maximum of 2nd level.
        - Clarified the amount of undead turned from the "banishing undead" ability.
        
        `,
        date: "2024-10-23 21:33 CET" 
    },

    { 

        title: 'Average HP',
        content: `There's now the added choice whether to roll for the starting hit die or take the average. This generally makes Barbarians more appealing to pick, as before it was a big gamble when rolling HP at level 1. Levels beyond that you always roll HD as usual however.

        Oil is no longer stackable. My thought process behind this is that you need a way to keep the oil flask from breaking, making them obviously more encumbering when you haul around 10 of them in a pile. This being the case also makes torches more appealing to use if you need the slots for something else, like gold.

        <b> Changes: </b>

        - You can now either roll your starting HD or choose the average, rounded down.
        - Oil is no longer stackable and counted as 1 slot each.
        
        `,
        date: "2024-10-09 21:40 CET" 
    },

    { 

        title: 'Spell Memorization',
        content: `Going from the Mana point system to the standard Vancian spell memorization system to simplify spellcasting. I'm still keeping some of the mana categorization, but mechanically it doesn't matter anymore. Now you simply decide what spells you have prepared for the day at dawn.

        <b> Changes: </b>

        - Added the classic Vancian Spell Memorization magic system.
        - Mana points system is moved to unused rules.
        - Psionic sleep is now more defined. It is closer to a "mini" version of the spell Sleep.
        - Added colors to the different titles on the website.
        - Added dice rolling to randomize starting age.
        
        `,
        date: "2024-09-29 21:57 CET" 
    },

    { 

        title: 'Armor + Fighter Parry',
        content: `The parry mechanic in from Swords & Wizardry (S&W) was created as a way to 'buff' fighters. Since S&W is an OD&D retroclone, it follows similar rules from the game which is different from AD&D, which we also use:

        - Armor in S&W only goes up to Plate Mail, which gives 16 AC. This was 3 AC originally. 20 - 3 = 17. 17 - 1 = 16. (Descended to ascended AC calculation)
        - The parry mechanic is justified here because the risk of dying as a frontline fighter is high.

        Initially, I opted to nerf the parry, limiting it to one parry per round. This was because I felt the full extent of it, as written, was too powerful because RAW you could parry ALL attacks. This easily gives fighters upwards of 25+ AC with 19 AC armor and high dex. And that is WITHOUT magical armor.

        We've been using the armors from AD&D, where plate can go up to 19 AC. This unintentionally resulted in two buffs for fighters:
        
        - One from the S&W parry mechanic.
        - Another from the higher AC armors in AD&D.

        And so to balance things out I will use the parry mechanic (RAW), allowing fighters to parry any attacks they can see. Making them strong frontliners, but not too strong. 
        
        On the other end I will remove full plate and other plate variants so that the highest AC is plate mail with 16 AC, keeping it in line with the OD&D style.

        <b> Changes: </b>

        - Rebalancing fighter, better parry that includes all enemies in the facing direction. 
        - Worse armor for everyone. 9 base AC up to 16 with plate.
        - Added pitons, iron spikes, and hammer to equipment.

        `,
        date: "2024-09-13 16:53 CET" 
    },

    { 

    
        title: 'Movement Rates (Exploration and Encounter speed)',
        content: `As we have been using the OSE movement from before, I replaced the rules for "Indoor, Underground & City Movement". The main point is that Exploration (EX) and Encounter (EN) speeds are named separated, making it easier to reference.

        <b> Changes: </b>

        - Added notes for the Exploration and Encounter speeds and rules.
        
        `,
        date: "2024-08-27 13:13 CET" 
    },


    { 
        title: 'Segment Combat + Wisdom',
        content: `After almost a year of using a basic group combat system without structured phases or segments, we're going with the OSRIC AD&D retroclone interpretation. It adds a little more crunch but a greater depth, especially in spellcasting. 
        
        In other news I also decided to go back to the standard 6 ability score structure by splitting MIND and adding Intelligence and Wisdom. The reason for this is because having both INT & WIS as one score is very risky and can easily cripple some casters if their score gets lowered, which is surprisingly common in some cases.

        Because I run a "godless" setting where magic works similarly from spellbooks between Law & Chaos, having MIND can be more justified. But this game changes constantly and I thought going back now after awhile was in general just a fun experiment.
        
        With that said, Wisdom is not totally useless. You can get some magic resist modifiers, a bonus spell, and spell fizzling shared between classes, which is always fun.

        <b> Changes: </b>

        - Added OSRIC combat
        - Split MIND into Intelligence & Wisdom
        - Changed languages to spoken languages & literacy (Intelligence) 
        - Added magic saving throw modifier (Magic Saves, Wisdom)
        - Added Spell Bonus (Wisdom)
        - Added Spell Fizzling between casters (Wisdom)
        - Added Reaction Modifiers (Charisma)
        - Added Weapon Speed Factors
        - Removed Slow weapon keyword (not needed when using Weapon Speed Factor)

        The character sheet has also been updated <a href="https://docs.google.com/spreadsheets/d/1XlUl6O1_ymb5VPnOyDb6dPRgYk0ry6mivazzenZiKyA/edit?usp=sharing" target="_blank"><u>HERE</u></a>
        
        `,
        date: "2024-08-14 21:37 CET" 
    },

    { 
        title: 'Illusionist',
        content: `The Illusionist class, including spells from the new S&W supplement as well as the "declaration" part of the combat system is now added to the website. I might use the segment system from AD&D as well in the future. But this will do for now.
        
        I also added a few QoL improvements on the website for both desktop and mobile. This also includes a page in remembrance of our fallen adventurers "Hall of the Dead". 

        TLDR:

        - Added Illusionist class
        - Added phases to combat rounds
        - Added Read Magic variants for spellcasters. This includes; Read Chaos Magic (Chaos Mage), Read Law Magic (Law Mage), Read Illusion Magic (Illusionist)
        - Added new weapon keyword from OSE, "slow", although only relevant during ties
        - Added "Hall of the Dead"

        - Changed the initiative description
        - Moved Weapons vs Armor to unused rules
        - Website changes on desktop and mobile

        `,
        date: "2024-08-04 18:22 CET" 
    },

    { 
        title: 'Summer Update',
        content: `This will mostly be combat changes taken from AD&D 1e/2e, in addition to making the update section here on the site a little nicer with proper formatting.
        
        One thing that caught my eye was using the weapon proficiencies from 1e. The rules are simple enough, you pick a weapon and you can use it just as usual. But every other weapon that you aren't proficient with is penalized. This is simple and effective in my opinion. It rewards having different weapons in the group. On the other end it might reward metagaming?
        
        The second big mechanic which is a little bit more crunchy is weapon types vs armor. There's now 3 different types of damage. Slashing, piercing and bludgeoning. 1e makes this rule very complicated, where every weapon attack has to be compared on a table depending on what armor the opponent has. Mine is more close to the optional rule in 2e but even more simple where there is only 3 types of weapon damage vs 3 types of armor.
        
        Other than that, the other changes are small and summarized below.

        TLDR:

        - Added Weapon proficiency.
        - Added Weapon Types vs. Armor.
        - Added Leaving Melee. Retreat and Fighting Withdrawal.
        - Added Movement and Missile Combat. Standing still grants the same attack as before, while if you want to move you can only up to half your movement rate and half fire rate.
        - Added Weapon keywords. 

        - Changed downtime healing to always be 1 per day. 1d3 when treated by a physician.
        - Changed initiative to d20 instead of d6.
        - Changed Barbarian surprise to be 1 in 6 for the ENTIRE party, instead of Barbarian immunity. Barb support. 

        `,
        date: "2024-07-17 18:00 CET" 
    },

    { 
        title: 'Movement & Travel Speed',
        content: `The movement of your character in Dungeons & Dragons is used in multiple ways. Both as combat movement (rounds), dungeon crawl (turns) and overworld travel (days).

        As of right now, I have only used an encumbrance system that decreases the movement of your character when overencumbered. The standard way of calculating movement is based on overall encumbrance. For example, if you're carrying more than 50% of your total etc it changes your speed.

        Instead of doing that I'm opting to use armor as the main movement ruling, less to keep track of and if you use the same armor it's easier to remember.
        
        `,
        date: "2024-05-31 23:00 CET" 
    },

    { 
        title: 'Insanity',
        content: `I sat down for a little while to try and make the sanity system less of a small nuisance and more of a constant threat. One big problem I've had with it has been the fact that there aren't any long-term consequences to gaining insanity, instead it sort of worked as a lite-version of HP. These new rules also fixes the dependency to have a high Mind score, which a certain Walker will be happy about. 

        Anyways, I found a much better system that is quite similar to the current one, from a Lovecraftian game called Silent Legions. This system slots in well with what I wanted to do. It rewards good long term play, planning, and good ol' risk taking. We'll see how it plays out. Read up on it on the "Insanity" tab!
        
        `,
        date: "2024-05-16 22:17 CET" 
    },

    { 
        title: 'Halfling Skills',
        content: `Modified the Halfling skill "Lucky" to "Stealthy." Been reading the Hobbit recently and I think this is a better option especially when I added the racial traits before the Specialist skills were added.
        
        `,
        date: "2024-05-16 22:17 CET" 
    },

    { 
        title: 'Races & Humans',
        content: `In short: Humans will now be the only playable race! I went through this during the Week 32 session, but in short: 
        I want to lean on the "familiar characters vs unfamiliar world" more. I think the fantasy races right now that are playable are more suited for a high fantasy campaign. 
        Obviously the humanoid races won't be removed. We instead talked about having them show up to be "unlocked" through play. But as of right now the only race available will be humans. Old characters that are humanoids can still be played.

        And lastly, races won't get bonuses anymore. Human characters created before this change still keeps the "+1 morale and loyalty" bonus to retainers, so don't remove this if you have this one already!
        
        `,
        date: "2024-05-06 17:55 CET" 
    },
    
    { 
        title: 'Inquisitor Restrictions & Spell Copying',
        content: `Inquisitors are now restricted to three magic items. I wanted to add some sort of restriction similar to Paladins, but not the whole 'giving away all your gold' ruling. 

        And when it comes to the act of copying spells from a scroll to your spell book, this would be rather cheap compared to something like Spell Researching. Copying spells only run you the cost of magical ink for the spell book paper and time to write it down. In game terms this procedure costs 100 GP and one full days' worth of downtime per spell level.
        
        `,
        date: "2024-05-03 16:31 CET" 
    },
    
    { 
        title: 'Website Launch!',
        content: `This will be the place where I update rules and add other fun stuff :)

        `, 
        date: "2024-04-16 16:52 CET" 
    },

    { 
        title: 'Between Session Play',
        content: `These aren't rules written in the document specific to "system" rules, but more or less by me as a DM to put rules down in regard to what characters can't do between sessions and what they can. I'm somewhat lenient on what characters can do between sessions, especially when it comes to traveling. Because travling can be dangerous and costly mostly in way of monsters and rations respectively. With that said, this is not a thing when you're traveling between sessions.

        To emphasize in-game decisions, characters cannot perform any actions except role play or strict travel. This includes gathering items in other locations or the like. However, things like shopping or finding retainers will be allowed. This is to filter out the more "boring" stuff and not make this into a play-by-post game, as that will eat up too much of my free time.
        
        `, 
        date: "2024-04-11 19:05 CET" 
    },

    { 
        title: 'Rules - Multiclassing (Page 16)',
        content: `These are my rules for combining two or more classes on a single character. It's a combination of the AD&D dual-classing rules without the restriction of only allowing humans to dual-class with the added cost of the training rules, which aren't a thing currently except now when deciding to multi-class. It's most similar to the 5e rules when put in use mechanically, but you're not encouraged to "build" the character in stages. You still can, but with added costs of time and gold to switch between leveling the classes. 
        
        It's probably not perfect and I haven't seen anyone use it in this way, but I think old school multi-classing and dual-classing is too restrictive so I opted for this amalgamation :)
        
        `, 
        date: "2024-03-17 14:01 CET" 
    },

    { 
        title: 'Rules - Two-Weapon Fighting and Two-Handed Weapons (Page 3)',
        content: `(This is taken from S&W) Just as shields improve armor class by 1, fighting two-handed grants a +1 to damage rolls (except for weapons that can only be used two-handed, where this is already taken into account in the weapon’s damage), and fighting with a weapon in each hand gives a +1 to hit. (Note that fighting with two weapons does not actually give two separate attacks; it just increases the likelihood of landing a successful blow.)
        
        `, 
        date: "2024-03-01 19:54 CET" 
    },

    { 
        title: 'Rules - Ranged Weapons (Page 37)',
        content: `As I've said before, my goal is to make combat as quick to run as possible. Swords & Wizardry is the baseline for basically everything in this system and I think they do it really well, so I'm detailing the ranged combat similarly to how they have written it. 
        
        I wanted to avoid the Multiple Attacks akin to AD&D, even though I think they could be fun. Such as the table for fighters: 3/2 attacks. Meaning you can attack three times in 2 rounds. 2 attacks one round and 1 the next. Ranged weapons (shortbow) now have a rate of 2 per round. Meaning 2 attacks per round. And Heavy Crossbow has a rate of 1/2, one round for shooting and one for reloading. But it now deals 1d10 damage, the highest out of all missile weapons. I wanted to avoid the confusion to choose between movement and reloading, instead just defining it as a standard action. Darts have a rate of 3! Broken! 
        
        Note that maximum ranges are also added. There is no minimum range, it is always possible to shoot unless engaged in melee combat. A penalty would be applied beyond the maximum range  (or in the case of covers/hinderances).
        
        `, 
        date: "2024-03-01 19:54 CET" 
    },

    // Add posts here
    ];
}

function loadUpdatePost(anchor)
{
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = '<h1>Updates</h1>';
    var posts = getUpdatePosts();

    for (var i=0; i<posts.length; i++) {
        var postElement = createUpdatePost(posts[i].title, posts[i].content, posts[i].date);
        mainContent.appendChild(postElement);
    }

    if (anchor) {
        var target = document.getElementById(anchor);
        if (target) {
            if (window.scrollTargetIntoView) {
                window.scrollTargetIntoView(target);
            } else {
                target.scrollIntoView();
            }
        }
    }
}

window.createUpdateId = createUpdateId;
window.getUpdatePosts = getUpdatePosts;
