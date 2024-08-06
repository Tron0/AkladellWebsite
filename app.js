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
    mainContent.innerHTML = '<h1>Welcome to the Home Page!</h1>';
}

function loadUpdatePost()
{
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = '<h1>Updates</h1>';

    var posts = [

    { 
        title: 'Illusionist',
        content: `The Illusionist class, including spells from the new S&W supplement as well as the "declaration" part of the combat system is now added to the website. I might use the segment system from AD&D as well in the future. But this will do for now.
        
        I also added a few QoL improvements on the website for both desktop and mobile. This also includes a page in remembrance of our fallen adventurers "Hall of the Dead". 

        TLDR:

        - Added Illusionist class
        - Added phases to combat rounds
        - Added Read Magic variants for spellcasters. This includes; Read Chaos Magic (Chaos Mage), Read Law Magic (Law Mage), Read Illusion Magic (Illusionist)
        - Added new weapon keyword from OSE, "slow", although only relevant during ties.
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

document.getElementById('discordlink').addEventListener('click', function(event)
{
    event.preventDefault()
    window.open('https://discord.gg/dhqJpXt42a', '_blank')
});

function loadAboutPage()
{
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = `<h1>About</h1>

    <p>This is a website for my Old School Dungeons & Dragons game!</p>`;
}

