'use strict';

var SONG_OF_WEEK_START_DATE = '2026-06-08T00:00:00';
var SONG_OF_WEEK_SEED       = 'akladell-song-of-week';
var SONG_OF_WEEK_WEEK_MS    = 7 * 24 * 60 * 60 * 1000;

function bc(album, track) {
    return 'https://bandcamp.com/EmbeddedPlayer/album=' + album + '/size=large/bgcol=333333/linkcol=0f91ff/minimal=true/track=' + track + '/transparent=true/';
}

var SONG_OF_WEEK_PLAYLIST = [
    { title: 'When A Soul Lets Go Of Its Body',                  artist: 'MindSpring Memories',            bandcampUrl: bc(3680623443,  780284601), added: '2026-06-08' },
    { title: 'Travelling Through the Darkness to Find the Light',artist: 'desert sand feels warm at night', bandcampUrl: bc(1380781724, 2471812793), added: '2026-06-08' },
    { title: 'どこまでが君で、どこからが私？',                      artist: 't e l e p a t h テレパシー能力者',  bandcampUrl: bc(1958100351, 3046635489), added: '2026-06-08' },
    { title: 'あの微笑みの裏で、君は私をほどいていた',              artist: 't e l e p a t h テレパシー能力者',  bandcampUrl: bc(1236331852, 4195386925), added: '2026-06-08' },
    { title: '別の人生で',                                        artist: '18 DAYS',                        bandcampUrl: bc(1367062204, 1711521317), added: '2026-06-08' },
    { title: 'Dreamland, a Cryptosystem',                        artist: 'MindSpring Memories',            bandcampUrl: bc(3114440086,  827325565), added: '2026-06-08' },
    { title: 'インフィニティプール',                               artist: 'desert sand feels warm at night', bandcampUrl: bc(1775677362, 1385052644), added: '2026-06-08' },
    { title: 'No Roads Home',                                    artist: 'MindSpring Memories',            bandcampUrl: bc( 916048908,  938450816), added: '2026-06-11' },
    { title: '今夜',                                             artist: 'ネザーnether',                    bandcampUrl: bc(1648100529, 2429423626), added: '2026-06-11' },
    { title: '集中，嬴',                                          artist: '天堂山',                          bandcampUrl: bc(1406976005, 2818307935), added: '2026-06-11' },
    { title: '森林漫步',                                          artist: '天堂山',                          bandcampUrl: bc(1406976005, 3189013780), added: '2026-06-11' },
    { title: 'Taħt Is-Siġar, Għal Dejjem',                       artist: 'desert sand feels warm at night', bandcampUrl: bc( 593724558, 3110033747), added: '2026-06-11' },
    { title: 'Jibda l-Orizzont',                                 artist: 'desert sand feels warm at night', bandcampUrl: bc( 593724558, 2996460435), added: '2026-06-11' },
    { title: 'Riflessjonijiet Ta’ Ħajti',                        artist: 'desert sand feels warm at night', bandcampUrl: bc( 593724558,  472912844), added: '2026-06-11' },
    { title: 'Reverie',                                          artist: 'desert sand feels warm at night', bandcampUrl: bc( 593724558, 2308523913), added: '2026-06-11' },
    { title: 'Il-Foresta Hija Dar Tiegħi',                       artist: 'desert sand feels warm at night', bandcampUrl: bc( 593724558, 1662647575), added: '2026-06-11' },
    { title: '癒し',                                             artist: 'desert sand feels warm at night', bandcampUrl: bc(2603265516, 2614665364), added: '2026-06-11' },
    { title: '空中庭園',                                          artist: 'desert sand feels warm at night', bandcampUrl: bc(2344146011, 2727360263), added: '2026-06-11' },
    { title: 'ユートピアに到着',                                  artist: 'desert sand feels warm at night', bandcampUrl: bc(3859378203, 1646987015), added: '2026-06-11' },
];
