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

