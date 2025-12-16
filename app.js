'use strict';
console.log("JavaScript file has been loaded successfully!");

function createUpdatePost(title, content, date)
{
    // Create elements
    var post = document.createElement('div');
    post.className = 'post';
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

window.addEventListener('load', function()
{
    loadHomePage();
});

function loadHomePage()
{
    var mainContent = document.getElementById('content');
    mainContent.classList.add('about-page');
    mainContent.innerHTML = '<h1>Home Page</h1>';
}

function loadAboutPage() {
    var mainContent = document.getElementById('content');
    mainContent.className = ''; // Clear any previous page classes (optional)
  
    // Inject a container with id="about"
    mainContent.innerHTML = `
      <div id="about">
        <h1>About</h1>
        <p>This is a website for my Old School Dungeons & Dragons game!</p>
      </div>
    `;
  }

document.addEventListener('DOMContentLoaded', () => {
document.querySelector('.spells-link').addEventListener('click', e => {
    e.preventDefault();
    loadContent('#spells');
});
});
  

function loadUpdatePost()
{
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = '<h1>Updates</h1>';

    var posts = [

    { 

        title: 'D6 Specialists',
        content: `Specialists now have a d6 hit die. Different types of storage containers are also added under general items.
        
        <b> Changes: </b>

        - Changed specialist went from d4 HD to d6.
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
        One important thing regarding wisdom now is that you can gain up to a 4th level spell for free. 
        
        <b> Changes: </b>

        - 3d6 for days training
        - Bonus spells for law mages under wisdom are now "learned" when you have the ability to cast them. You need to write down and choose one spell from the ones available when making the character.
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
    for (var i=0; i<posts.length; i++) {
        var postElement = createUpdatePost(posts[i].title, posts[i].content, posts[i].date);
        mainContent.appendChild(postElement);
    }
}

