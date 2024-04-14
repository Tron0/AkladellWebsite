'use strict';
console.log("JavaScript file has been loaded successfully!");

function createUpdatePost(title, content, date)
{
    // Create elements
    var post = document.createElement('div');
    post.className = 'post';
    var postTitle = document.createElement('h2');
    var postContent = document.createElement('p');
    var postDate = document.createElement('small');
    // Set content
    postTitle.textContent = title;
    postContent.textContent = content;
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
    mainContent.innerHTML = '<h2>Welcome to the Home Page!</h2><p>This is the default page.</p>';
}

function loadUpdatePost()
{
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = '<h2>Updates</h2>';

    var posts = [
    { 
        title: 'Between Session Play',
        content: `These aren't rules written in the document specific to "system" rules, but more or less by me as a DM to put rules down in regard to what characters can't do between sessions and what they can. I'm somewhat lenient on what characters can do between sessions, especially when it comes to traveling. Because travling can be dangerous and costly mostly in way of monsters and rations respectively. With that said, this is not a thing when you're traveling between sessions.
        To emphasize in-game decisions, characters cannot perform any actions except role play or strict travel. This includes gathering items in other locations or the like. However, things like shopping or finding retainers will be allowed. This is to filter out the more "boring" stuff and not make this into a play-by-post game, as that will eat up too much of my free time.`, 
        date: "2023-04-11 19:05 CET" 
    },

    { 
        title: 'Rules - Multiclassing (Page 16)',
        content: `These are my rules for combining two or more classes on a single character. It's a combination of the AD&D dual-classing rules without the restriction of only allowing humans to dual-class with the added cost of the training rules, which aren't a thing currently except now when deciding to multi-class. It's most similar to the 5e rules when put in use mechanically, but you're not encouraged to "build" the character in stages. You still can, but with added costs of time and gold to switch between leveling the classes. It's probably not perfect and I haven't seen anyone use it in this way, but I think old school multi-classing and dual-classing is too restrictive so I opted for this amalgamation :)`, 
        date: "2023-03-17 14:01 CET" 
    },

    { 
        title: 'Rules - Two-Weapon Fighting and Two-Handed Weapons (Page 3)',
        content: `(This is taken from S&W) Just as shields improve armor class by 1, fighting two-handed grants a +1 to damage rolls (except for weapons that can only be used two-handed, where this is already taken into account in the weapon’s damage), and fighting with a weapon in each hand gives a +1 to hit. (Note that fighting with two weapons does not actually give two separate attacks; it just increases the likelihood of landing a successful blow.)`, 
        date: "2023-03-01 19:54 CET" 
    },

    { 
        title: 'Rules - Ranged Weapons (Page 37)',
        content: `As I've said before, my goal is to make combat as quick to run as possible. Swords & Wizardry is the baseline for basically everything in this system and I think they do it really well, so I'm detailing the ranged combat similarly to how they have written it. I wanted to avoid the Multiple Attacks akin to AD&D, even though I think they could be fun. Such as the table for fighters: 3/2 attacks. Meaning you can attack three times in 2 rounds. 2 attacks one round and 1 the next. Ranged weapons (shortbow) now have a rate of 2 per round. Meaning 2 attacks per round. And Heavy Crossbow has a rate of 1/2, one round for shooting and one for reloading. But it now deals 1d10 damage, the highest out of all missile weapons. I wanted to avoid the confusion to choose between movement and reloading, instead just defining it as a standard action. Darts have a rate of 3! Broken! Note that maximum ranges are also added. There is no minimum range, it is always possible to shoot unless engaged in melee combat. A penalty would be applied beyond the maximum range  (or in the case of covers/hinderances).`, 
        date: "2023-03-01 19:54 CET" 
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
    window.open('https://discord.gg/By5MPxhrJf', '_blank')
});

function loadAboutPage()
{
    var mainContent = document.getElementById('content');
    mainContent.innerHTML = `<h2>About</h2>

    <p>This is a website for my D&D game!</p>

    <p>In the grand scheme, this game is roughly <b>50% Swords & Wizardry</b>, which is a <b>Original Dungeons & Dragons</b> retroclone created by <b>Matt Finch</b>.</p>
     
    <p><b>35% is compiled of Advanced Dungeons and Dragons</b> rules, which is mainly just relevant on my end as a DM.</p>
    
    <p>And the <b>15% that is left is a combination of a multitude of other things, including my own homebrew rules.</b></p>
    
    <p>The game right now is 100% IRL, but games will be hosted online on the Discord in the future. Feel free to join for any future updates!</p>`;
}