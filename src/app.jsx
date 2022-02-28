import './App.css';

import React, { Component } from 'react';
import Header from './components/header/header';

import AuthService from '~/service/auth';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Watch from './pages/watch';
const authService = new AuthService();
class App extends Component {
  state = {
    videos: [],

    currentVid: {
          "id": "e9BIS442PM8",
          "snippet": {
              "publishedAt": "2022-02-27T17:25:12Z",
              "channelId": "UC2x_qNZXKDxNP1j4jvHATRQ",
              "title": "McMaster says Putin \"got a lot more than he bargained for\" with Ukraine invasion",
              "description": "H.R. McMaster, the former national security adviser and retired lieutenant general, says he thinks Putin \"is very vulnerable.\"\n\n\"Face the Nation\" is America's premier Sunday morning public affairs program. The broadcast is one of the longest-running news programs in the history of television, having debuted November 7, 1954, on CBS. Every Sunday, \"Face the Nation\" moderator and CBS News senior foreign affairs correspondent Margaret Brennan welcomes leaders, newsmakers, and experts to a lively round table discussion of current events and the latest news.\n\nSubscribe to the \"Face the Nation\" YouTube channel: https://bit.ly/1SUQc68​\nWatch full episodes of \"Face the Nation\": https://cbsn.ws/20pbkSF​\nFollow \"Face the Nation\" on Instagram: https://bit.ly/23Xuhk4​\nLike \"Face the Nation\" on Facebook: https://on.fb.me/23Xmz9E​\nFollow \"Face the Nation\" on Twitter: https://bit.ly/1o3QDQo​\nSubscribe to our newsletter: https://cbsn.ws/1RqHw7T​\nDownload the CBS News app: https://cbsn.ws/1Xb1WC8​\nTry Paramount+ free: https://bit.ly/2OiW1kZ\n\nFor video licensing inquiries, contact: licensing@veritone.com",
              "thumbnails": {
                  "default": {
                      "url": "https://i.ytimg.com/vi/e9BIS442PM8/default.jpg",
                      "width": 120,
                      "height": 90
                  },
                  "medium": {
                      "url": "https://i.ytimg.com/vi/e9BIS442PM8/mqdefault.jpg",
                      "width": 320,
                      "height": 180
                  },
                  "high": {
                      "url": "https://i.ytimg.com/vi/e9BIS442PM8/hqdefault.jpg",
                      "width": 480,
                      "height": 360
                  },
                  "standard": {
                      "url": "https://i.ytimg.com/vi/e9BIS442PM8/sddefault.jpg",
                      "width": 640,
                      "height": 480
                  },
                  "maxres": {
                      "url": "https://i.ytimg.com/vi/e9BIS442PM8/maxresdefault.jpg",
                      "width": 1280,
                      "height": 720
                  }
              },
              "channelTitle": "Face the Nation",
              "tags": [
                  "Face the Nation",
                  "CBS News",
                  "video",
                  "Margaret Brennan",
                  "U.S.",
                  "politics",
                  "russia",
                  "ukraine",
                  "crisis",
                  "war",
                  "invasion",
                  "attack",
                  "vladimir putin",
                  "soldiers",
                  "troops",
                  "russian soldiers",
                  "H.R. McMaster",
                  "face the nation mcmaster",
                  "face the nation today",
                  "face the nation feb 27 2022",
                  "ukraine russia conflict"
              ],
              "categoryId": "25",
              "liveBroadcastContent": "none",
              "localized": {
                  "title": "McMaster says Putin \"got a lot more than he bargained for\" with Ukraine invasion",
                  "description": "H.R. McMaster, the former national security adviser and retired lieutenant general, says he thinks Putin \"is very vulnerable.\"\n\n\"Face the Nation\" is America's premier Sunday morning public affairs program. The broadcast is one of the longest-running news programs in the history of television, having debuted November 7, 1954, on CBS. Every Sunday, \"Face the Nation\" moderator and CBS News senior foreign affairs correspondent Margaret Brennan welcomes leaders, newsmakers, and experts to a lively round table discussion of current events and the latest news.\n\nSubscribe to the \"Face the Nation\" YouTube channel: https://bit.ly/1SUQc68​\nWatch full episodes of \"Face the Nation\": https://cbsn.ws/20pbkSF​\nFollow \"Face the Nation\" on Instagram: https://bit.ly/23Xuhk4​\nLike \"Face the Nation\" on Facebook: https://on.fb.me/23Xmz9E​\nFollow \"Face the Nation\" on Twitter: https://bit.ly/1o3QDQo​\nSubscribe to our newsletter: https://cbsn.ws/1RqHw7T​\nDownload the CBS News app: https://cbsn.ws/1Xb1WC8​\nTry Paramount+ free: https://bit.ly/2OiW1kZ\n\nFor video licensing inquiries, contact: licensing@veritone.com"
              },
              "defaultAudioLanguage": "en"
          },
          "contentDetails": {
              "duration": "PT8M9S",
              "dimension": "2d",
              "definition": "hd",
              "caption": "false",
              "licensedContent": true,
              "regionRestriction": {
                  "blocked": [
                      "AU",
                      "CA",
                      "JP"
                  ]
              },
              "contentRating": {},
              "projection": "rectangular"
          },
          "statistics": {
              "viewCount": "860008",
              "likeCount": "9296",
              "favoriteCount": "0",
              "commentCount": "3143"
          },
          "channel": {
              "snippet": {
                  "thumbnails": {
                      "default": {
                          "url": "https://yt3.ggpht.com/ytc/AKedOLT2qU851SLR5tD8RlXDn9InDuzoiD-9bSyO7lAB=s88-c-k-c0x00ffffff-no-rj",
                          "width": 88,
                          "height": 88
                      },
                      "medium": {
                          "url": "https://yt3.ggpht.com/ytc/AKedOLT2qU851SLR5tD8RlXDn9InDuzoiD-9bSyO7lAB=s240-c-k-c0x00ffffff-no-rj",
                          "width": 240,
                          "height": 240
                      },
                      "high": {
                          "url": "https://yt3.ggpht.com/ytc/AKedOLT2qU851SLR5tD8RlXDn9InDuzoiD-9bSyO7lAB=s800-c-k-c0x00ffffff-no-rj",
                          "width": 800,
                          "height": 800
                      }
                  }
              },
              "statistics": {
                  "subscriberCount": "231000"
              }
          },
      "comments": {
          "nextPageToken": "QURTSl9pMHgxTVdLZXpIX1FjVDR2OE55UndIOWVfNmU4MGd3UDhGR3NNYVZKNU1hTzdxOXFiQzBacThla2RQTDNlVnVKTFg1TmFDdDY4cHdiTlloSkM4QXVfWG9MM2N5RE92dUtpeXByNDMtclpWWDVfQVpBelYtU1VKbG9xZlVzWkFpZmkwT2E5SDNwRXdnMkItZWpsa0FCenFWVkVXRXdQeTRpUHJvWEU5ZzB5OEx2N0s3bmFzNDdjWVdmbkpMcHNRWEVRbGpSM1BMVkxTREp0Q3NQVlhuY3hyS0FvV0RNZzlkWVkzLTh0djlBaHVLS3g0NG5lMERkSGI3dGJONzI0dHNQTnJ2bldlelM2UkVtOHZPdDZ6bDM2SHFhRHFVeElWdUdFbGpqeHVmbUNqLVFsRmlBRkNaaDVMSlpDbXdnQQ=="
      }
  },
    // 

    comments: [
        {
            "kind": "youtube#commentThread",
            "etag": "vIN3uBAMgnDQCAj-CnuXZ5M40Wo",
            "id": "UgzrzWYQTyC3x-JrTd94AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "TeLOTJVZtICN7VRHoE2VGdy7S74",
                    "id": "UgzrzWYQTyC3x-JrTd94AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "I am Polish, our hearts are with you, Ukrainian people, our brothers and sisters!",
                        "textOriginal": "I am Polish, our hearts are with you, Ukrainian people, our brothers and sisters!",
                        "authorDisplayName": "1954viking",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLRiOZGn55rlqcPANydlyMeOKDa87eOSuin3At2L=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCe5XAeIBOvcyffgKyBO3wGg",
                        "authorChannelId": {
                            "value": "UCe5XAeIBOvcyffgKyBO3wGg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 702,
                        "publishedAt": "2022-02-27T18:53:43Z",
                        "updatedAt": "2022-02-27T18:53:43Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 67,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "b9pSMqlUDl4XNUS4ixEO8NEeeJQ",
            "id": "UgxF7zO26gZD7eVxchV4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "RlfYR1OF5-wSb9EY83JcmSXx9Zc",
                    "id": "UgxF7zO26gZD7eVxchV4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "“All war is a symptom of man's failure as a thinking animal.”<br>― John Steinbeck",
                        "textOriginal": "“All war is a symptom of man's failure as a thinking animal.”\n― John Steinbeck",
                        "authorDisplayName": "1k challenge with 0 video",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/cYLh_WWJ_-WVqXfb6UMcOFCIVvamSze8MdKtpLzV-4rurCydn3heuXghb4eASNgYxq47N7rBfw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCRN0Z4q_g0BmOzMp6-xNCyQ",
                        "authorChannelId": {
                            "value": "UCRN0Z4q_g0BmOzMp6-xNCyQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 23,
                        "publishedAt": "2022-02-28T04:15:43Z",
                        "updatedAt": "2022-02-28T04:15:43Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 1,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "xlRFjIw2KjBnit8iOknE1B-LzEI",
            "id": "UgwMqUDggE0u6Y9dR2h4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "GsTaL3J9aUQB2vQYpZeffCmKRGk",
                    "id": "UgwMqUDggE0u6Y9dR2h4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Ukrainians are such a brave and resilient people, I would have never begin to fathom their bravery in a face of a war that was uncalled for. I pray for Ukraine 🇺🇦 🙏",
                        "textOriginal": "Ukrainians are such a brave and resilient people, I would have never begin to fathom their bravery in a face of a war that was uncalled for. I pray for Ukraine 🇺🇦 🙏",
                        "authorDisplayName": "Diana Perez",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLQjCP_0uASz70HnwjSlcaA4MenPQ_cAupyj1wXZ5g=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCLm6WtZkDYq2NgcYUGzRFbA",
                        "authorChannelId": {
                            "value": "UCLm6WtZkDYq2NgcYUGzRFbA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 360,
                        "publishedAt": "2022-02-27T20:43:11Z",
                        "updatedAt": "2022-02-27T20:43:11Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 23,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "2LbGVtwivdaiDvY79HTjSEF2qig",
            "id": "UgwZL_vAkM3nY_b3PHx4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "o0H2wcGctX1BH9oUrJa-olZc6TE",
                    "id": "UgwZL_vAkM3nY_b3PHx4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Finally, an interview with a true expert and .....a real war hero.",
                        "textOriginal": "Finally, an interview with a true expert and .....a real war hero.",
                        "authorDisplayName": "Ronald McDonald",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLTRPTJ1MoeGMgBIogxINyqx3w_mDUyQPaRdmzEw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCIDEUYANotJtKf7ynmdrQeA",
                        "authorChannelId": {
                            "value": "UCIDEUYANotJtKf7ynmdrQeA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 47,
                        "publishedAt": "2022-02-27T19:35:30Z",
                        "updatedAt": "2022-02-27T19:35:30Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "v9kA5AcqW-VmjIZNuhFuCiDvixA",
            "id": "UgxuYbfIppirV6TE2Xd4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "pUT5FRCEk9kPBojhgAergp9uhaw",
                    "id": "UgxuYbfIppirV6TE2Xd4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "General McMaster was brilliant in commanding US forces in the Battle of 73 Easting. Unlike many of his commentary generals who didn’t command soldiers into battle. The General was there with his tankers as a Captain of the 2nd ACR. When he praises the bravery of the Ukrainian people, I take note.",
                        "textOriginal": "General McMaster was brilliant in commanding US forces in the Battle of 73 Easting. Unlike many of his commentary generals who didn’t command soldiers into battle. The General was there with his tankers as a Captain of the 2nd ACR. When he praises the bravery of the Ukrainian people, I take note.",
                        "authorDisplayName": "CZseventyfive",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLRh2fX3O5fhdiS_jS7tm8uuWgupslNKLBI0tsoj=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCtvI_CTgRQJGAA9xpfbjh0g",
                        "authorChannelId": {
                            "value": "UCtvI_CTgRQJGAA9xpfbjh0g"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 159,
                        "publishedAt": "2022-02-27T19:34:14Z",
                        "updatedAt": "2022-02-27T19:34:14Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 12,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "L6K_RDvVrkEQeIkt-z2Z7qg0h5Y",
            "id": "UgyI0DDBVCuKkxsuSZV4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "VyxghsaVA5XN_iybFXoEq4P4OVg",
                    "id": "UgyI0DDBVCuKkxsuSZV4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "I'm beyond honored to live amongst such heros and patriotism. Jus shows quality over quantity, love over hate, a because instead of a job. Much love and respect to Ukraine.",
                        "textOriginal": "I'm beyond honored to live amongst such heros and patriotism. Jus shows quality over quantity, love over hate, a because instead of a job. Much love and respect to Ukraine.",
                        "authorDisplayName": "Camden Ellisor",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLSzoJv8JHu4ZSkUKDQRqIlNWnzk5cHaxc6CkF2RoQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCSrwwJ0yvVzujLd01YkclZA",
                        "authorChannelId": {
                            "value": "UCSrwwJ0yvVzujLd01YkclZA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 32,
                        "publishedAt": "2022-02-27T21:25:37Z",
                        "updatedAt": "2022-02-27T21:25:55Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "Nq0647a-JfJn13dK_Dk0DFaiqi4",
            "id": "UgxXdzXVVtlXSWJcri94AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "gOIUOg6gmlSMdnYPmrc9M7y5_aY",
                    "id": "UgxXdzXVVtlXSWJcri94AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "All dictators are fearful and they just wanted to act tougher than they are, the courageous Ukrainians are going to teach the invaders a very good lesson because God bless those who are humble and innocence while penalised those who are proud and arrogance. God bless Ukraine and Ukrainians.",
                        "textOriginal": "All dictators are fearful and they just wanted to act tougher than they are, the courageous Ukrainians are going to teach the invaders a very good lesson because God bless those who are humble and innocence while penalised those who are proud and arrogance. God bless Ukraine and Ukrainians.",
                        "authorDisplayName": "jiekejienai777",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/Qwd4NJFKNHJ1Bw4SlrZ2raGpsUaLUJIlBkMUjkg4tGMoJoEumnx-Q5DiN_97b8BNTo6lieljsQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCMxlzW6W8TrNuW3FJY59QIw",
                        "authorChannelId": {
                            "value": "UCMxlzW6W8TrNuW3FJY59QIw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 18,
                        "publishedAt": "2022-02-27T23:12:10Z",
                        "updatedAt": "2022-02-27T23:12:10Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "xQBzywOhOM9gKi7ffgU8WWsLlPE",
            "id": "Ugw-wRefeZgsRVvdmc94AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "zo-W2dSExRc2SKVIabEUw9GDKEg",
                    "id": "Ugw-wRefeZgsRVvdmc94AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Sir, the Ukrainian Brave Stand is very inspiring. I trust  that a way to even better help the people of Ukraine is being carefully planned.",
                        "textOriginal": "Sir, the Ukrainian Brave Stand is very inspiring. I trust  that a way to even better help the people of Ukraine is being carefully planned.",
                        "authorDisplayName": "Joey Ho",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLSI3b-FkCEx6Sq6rZbq0_jmKIrnjW5kPaV0V5Af8n9kyqXZ_Dg5BbCAjfhAbEwr=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCaYDHG3OxVUDZog24p0gfDA",
                        "authorChannelId": {
                            "value": "UCaYDHG3OxVUDZog24p0gfDA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 198,
                        "publishedAt": "2022-02-27T18:03:25Z",
                        "updatedAt": "2022-02-27T18:03:25Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 8,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "44Z3jcJuTu8y9NKvWADYdPUvZKI",
            "id": "UgwH1ulZVUTMZA-kWa14AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "I13zCZL3F4dPmdMU385ySJSoxT0",
                    "id": "UgwH1ulZVUTMZA-kWa14AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "HR is right on many of his points, especially about sanctions.",
                        "textOriginal": "HR is right on many of his points, especially about sanctions.",
                        "authorDisplayName": "Arthur Lee",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLSI3IKQzWrJZelhsLr-dvuieWLvnFwpwBBL3F7OWg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCzsEU8N6A_76xvSfCa9FB7A",
                        "authorChannelId": {
                            "value": "UCzsEU8N6A_76xvSfCa9FB7A"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 46,
                        "publishedAt": "2022-02-27T20:48:38Z",
                        "updatedAt": "2022-02-27T20:48:38Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 3,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "i-8nzPE-2ppXThbxajyFO9ihUP4",
            "id": "UgwM14krxiZcYYhuRRF4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "zpfZFZLS914BIAMkkWHn2JXiO6I",
                    "id": "UgwM14krxiZcYYhuRRF4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Love to hear McMaster break down a situation like this.",
                        "textOriginal": "Love to hear McMaster break down a situation like this.",
                        "authorDisplayName": "Krabbeify",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLSzxddLmdC8UxuXZDVFwM57NvUbjiQ1NwbCYg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCoRVUly0DvjV5Fv2zeqXuKQ",
                        "authorChannelId": {
                            "value": "UCoRVUly0DvjV5Fv2zeqXuKQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 8,
                        "publishedAt": "2022-02-27T22:01:05Z",
                        "updatedAt": "2022-02-27T22:01:05Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "aq649Axkm0sCBB7zWOq-JlAJBpE",
            "id": "UgyfEGWYBsLBuqo5Qwl4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "fccWGjeV9YBY4Uojma1w5H62_Io",
                    "id": "UgyfEGWYBsLBuqo5Qwl4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "I'm so proud of Ukraine's  President, their people, and the Russians who are supporting Ukraine and standing for what is right",
                        "textOriginal": "I'm so proud of Ukraine's  President, their people, and the Russians who are supporting Ukraine and standing for what is right",
                        "authorDisplayName": "Jesus is Lord",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLS_GaawzCpnE1y3RSecHxo2uC-KKOqa2uVG=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCFXOljk-j_F_is6YVZqjLqg",
                        "authorChannelId": {
                            "value": "UCFXOljk-j_F_is6YVZqjLqg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 308,
                        "publishedAt": "2022-02-27T22:35:17Z",
                        "updatedAt": "2022-02-27T22:35:17Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 17,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "wRkLnrj8ercz1wAWbFRYnyvnn64",
            "id": "UgwxLQh_hRLl54ShqNp4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "51knVTDjEjboNmbWLSKDsA_b7AM",
                    "id": "UgwxLQh_hRLl54ShqNp4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "McMaster makes a good point. Namely, Russia has spread it's forces too thin and if Ukraine is successful in holding the line, for the next 48 hours, it will be impossible for Russia to pacify Ukraine...",
                        "textOriginal": "McMaster makes a good point. Namely, Russia has spread it's forces too thin and if Ukraine is successful in holding the line, for the next 48 hours, it will be impossible for Russia to pacify Ukraine...",
                        "authorDisplayName": "David Dersh",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLTG08OsoJ5WMJqKZEPzgy9W_KRtrUOy899PtMvW=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UC3suGwVwra_vxOr0p7FKsKg",
                        "authorChannelId": {
                            "value": "UC3suGwVwra_vxOr0p7FKsKg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 61,
                        "publishedAt": "2022-02-27T19:58:41Z",
                        "updatedAt": "2022-02-27T22:24:20Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 12,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "RRIDNeKixZkop8W7JHnpJN_EfbM",
            "id": "Ugwd2LgbN_gEq2CDTM14AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "gnNic_ARjycf_bCmc2eSzD6yBHw",
                    "id": "Ugwd2LgbN_gEq2CDTM14AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "God bless the warriors of Ukraine.",
                        "textOriginal": "God bless the warriors of Ukraine.",
                        "authorDisplayName": "Jeremy Bunn",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLTuAqxJxclGh8C-HcyR1B4PF1MHsEpXR6VQCg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UC9nljuGOmpcIZTzuMK6w2EQ",
                        "authorChannelId": {
                            "value": "UC9nljuGOmpcIZTzuMK6w2EQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 13,
                        "publishedAt": "2022-02-27T19:56:08Z",
                        "updatedAt": "2022-02-27T19:56:08Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "3IfLWyT8Uv2_D7xHcrbbMOEcusc",
            "id": "UgwdETtmZmGACXLM5yt4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "osxY50qPiToRh5ynpYCjzbNVTPo",
                    "id": "UgwdETtmZmGACXLM5yt4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "\"When [Putin] humiliates his intelligence director, that means everyone around him is telling him what he wants to hear, and he's living in a bubble.\"<br>Now doesn't that sound familiar?",
                        "textOriginal": "\"When [Putin] humiliates his intelligence director, that means everyone around him is telling him what he wants to hear, and he's living in a bubble.\"\nNow doesn't that sound familiar?",
                        "authorDisplayName": "Carlako32",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLQqll1gZADzGh2HUY0lTd9I_oU4yhTxj1lCiQ=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UC57Z_VaG5YjIq0Qxttlk3FQ",
                        "authorChannelId": {
                            "value": "UC57Z_VaG5YjIq0Qxttlk3FQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 61,
                        "publishedAt": "2022-02-27T22:37:31Z",
                        "updatedAt": "2022-02-27T22:37:31Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 13,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "viGhi04PkXWJpmSUUHD1ppZjJgU",
            "id": "UgzzBluEQ2YCRnMsEP14AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "fy6qnJpogSaNcxqjvlxTWazu1c4",
                    "id": "UgzzBluEQ2YCRnMsEP14AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Go Ukraine! Stand your ground!!! I admire your tenacity & resolve in fighting for your liberty, freedom & democracy. May God be with you ALL!!!🔥🙏💥",
                        "textOriginal": "Go Ukraine! Stand your ground!!! I admire your tenacity & resolve in fighting for your liberty, freedom & democracy. May God be with you ALL!!!🔥🙏💥",
                        "authorDisplayName": "Linda Collier",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLRg4tWCzGXLkorNNDL94g50T_mPjU_JVmVvDw=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UC2MtTUOOjmhJ0uPQ7nl0vEQ",
                        "authorChannelId": {
                            "value": "UC2MtTUOOjmhJ0uPQ7nl0vEQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 12,
                        "publishedAt": "2022-02-27T19:40:35Z",
                        "updatedAt": "2022-02-27T19:40:35Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "9yOFu_01cxqJ2DBzeV3Xfjk4Meg",
            "id": "UgxrR-f5jfFdvGWKuYF4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "pMyG0jAa283WY5L8V0Jneerfy0Y",
                    "id": "UgxrR-f5jfFdvGWKuYF4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Thank you H.R. McMaster. This has made me less apprehensive about this spinning too far out of control.",
                        "textOriginal": "Thank you H.R. McMaster. This has made me less apprehensive about this spinning too far out of control.",
                        "authorDisplayName": "Stephen Suddick",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLTUWSE-3l6m7VTC4PHPU9_ALOTTm_AEmUrJWA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCwPMWxAx0HimO3Y7s_QJMHQ",
                        "authorChannelId": {
                            "value": "UCwPMWxAx0HimO3Y7s_QJMHQ"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 12,
                        "publishedAt": "2022-02-27T19:47:14Z",
                        "updatedAt": "2022-02-27T19:47:14Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "gPyDIshGl2CwfWAsYm3-ITEbJ0E",
            "id": "UgwGEM0lBDWz6jT7Yfx4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "7AL4nl_-OuA6HumDRmBpt98rQoE",
                    "id": "UgwGEM0lBDWz6jT7Yfx4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "Great interview! McMaster has some great insights into what is going on in Ukraine and Russia.",
                        "textOriginal": "Great interview! McMaster has some great insights into what is going on in Ukraine and Russia.",
                        "authorDisplayName": "Larry Oberly",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLT7f7VIg0TnPAWhDfj0TX17HTMk4CPGvy32yg=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCAIraOPxb1SK_oFWeKIQBCw",
                        "authorChannelId": {
                            "value": "UCAIraOPxb1SK_oFWeKIQBCw"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 49,
                        "publishedAt": "2022-02-27T19:23:25Z",
                        "updatedAt": "2022-02-27T19:23:25Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 1,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "QTyDE82wxeNAw0lw43yt4HsfZ2c",
            "id": "UgwBeBsssqUzAcpX8Wx4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "zGzfztXYMkd74RX-GOYKVVpHl_c",
                    "id": "UgwBeBsssqUzAcpX8Wx4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "The extreme bravery and resolve of the Ukrainians was also fortified with extensive training by the US and UK militaries.  I am in NO way diminishing or taking the spotlight off of the Ukrainian men and women fighting and dying for the freedom of all of us right now.   The world hasn't seen heroism like that in a long time.  But for better or worse, the US and UK have many years of modern ground warfare experience which they were able to pass on,  while the Russians do not. And Putin's ego would not allow his to even contemplate such a thought.",
                        "textOriginal": "The extreme bravery and resolve of the Ukrainians was also fortified with extensive training by the US and UK militaries.  I am in NO way diminishing or taking the spotlight off of the Ukrainian men and women fighting and dying for the freedom of all of us right now.   The world hasn't seen heroism like that in a long time.  But for better or worse, the US and UK have many years of modern ground warfare experience which they were able to pass on,  while the Russians do not. And Putin's ego would not allow his to even contemplate such a thought.",
                        "authorDisplayName": "Timothy Roper",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLT3k1ycBxn4jBuBZ-55r312gqH6-mfeIjlm1A=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCSXUnzb2frpoLulX2XGFVuA",
                        "authorChannelId": {
                            "value": "UCSXUnzb2frpoLulX2XGFVuA"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 49,
                        "publishedAt": "2022-02-27T19:55:59Z",
                        "updatedAt": "2022-02-27T19:57:24Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 7,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "IhBIaTIxXM-tMVTG3tS85G9TEak",
            "id": "UgwEo0a4LUN7jPYjL214AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "TaZk5sQDzAQ7LxdAKeubJdBaios",
                    "id": "UgwEo0a4LUN7jPYjL214AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "“Looks good on a chart but it quite difficult to execute “ - reminds me of every Russian software engineer I’ve worked with. Looks good on paper. Doesn’t work until I fix their idiocy.",
                        "textOriginal": "“Looks good on a chart but it quite difficult to execute “ - reminds me of every Russian software engineer I’ve worked with. Looks good on paper. Doesn’t work until I fix their idiocy.",
                        "authorDisplayName": "RussianTanksAreMadeOfPotatoes",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLRFmE352PEmgugx7yjxbdtYZhMLPle4Oa-R_sYxqRB2W6vxfXfI2CUjCxteY-Wb=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCf_UWciY_jeQtacg4Bfp5wg",
                        "authorChannelId": {
                            "value": "UCf_UWciY_jeQtacg4Bfp5wg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 8,
                        "publishedAt": "2022-02-27T20:14:27Z",
                        "updatedAt": "2022-02-27T20:14:27Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 0,
                "isPublic": true
            }
        },
        {
            "kind": "youtube#commentThread",
            "etag": "ZjGZbGJ4vlncoMoVGryCd0GdVD8",
            "id": "Ugw4u2sBFBJbVuxKgwZ4AaABAg",
            "snippet": {
                "videoId": "e9BIS442PM8",
                "topLevelComment": {
                    "kind": "youtube#comment",
                    "etag": "bxCKPO7GmAmCD-1OooWi7FKyeMc",
                    "id": "Ugw4u2sBFBJbVuxKgwZ4AaABAg",
                    "snippet": {
                        "videoId": "e9BIS442PM8",
                        "textDisplay": "McMaster is so articulate. You rarely here such clarity from  government spokesmen past or present",
                        "textOriginal": "McMaster is so articulate. You rarely here such clarity from  government spokesmen past or present",
                        "authorDisplayName": "Orville Brown",
                        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AKedOLQbvHJiO0mIzxCvAUZk12Wp3RTifC6b9QLwFL6urA=s48-c-k-c0x00ffffff-no-rj",
                        "authorChannelUrl": "http://www.youtube.com/channel/UCwmAel4Wdbu1Go8hb_am7rg",
                        "authorChannelId": {
                            "value": "UCwmAel4Wdbu1Go8hb_am7rg"
                        },
                        "canRate": true,
                        "viewerRating": "none",
                        "likeCount": 129,
                        "publishedAt": "2022-02-27T18:51:42Z",
                        "updatedAt": "2022-02-27T18:51:42Z"
                    }
                },
                "canReply": true,
                "totalReplyCount": 11,
                "isPublic": true
            }
        }
    ],


    
    isSearched: false,
    videoNextToken: "",
    commentNextToken: "",
    searchQuery: "",
    users: {}
  }

  componentDidMount() {
    this.moveToMain();
  }

  onLogIn = () => {
    authService.login()
    .then(result => {
      const users = {
        "uid" : result.user.uid,
        "name": result.user.displayName,
        "url" : result.user.photoURL
      };

      const state = {...this.state};
      state.users = users;
      this.setState(state);
    })
  }

  onLogOut = () => {
    authService.logOut()
    .then(() => {
      const state = {...this.state};
      state.users = {};
      this.setState(state);
    })
  }

  searchVideos = (query) => {
    this.props.youtube
    .getSearchVideos(query)
    .then(response => this.setState({
      videos: response.items,
      currentVid: {},
      isSearched: true,
      videoNextToken: response.nextPageToken,
      searchQuery: query
    }))
  }

  getMoreVideos = () => {
    if (this.state.isSearched) {
      return this.props.youtube
      .getSearchVideos(this.state.searchQuery, this.state.videoNextToken)
      .then(response => {
        const data = [...this.state.videos];
        data.push(...response.items);
        this.setState({
          videos: data,
          videoNextToken: response.nextPageToken
        })
      })
    } else {
      return this.props.youtube
      .getMostPopular(this.state.videoNextToken)
      .then(response => {
        const data = [...this.state.videos];
        data.push(...response.items);
        this.setState({
          videos: data,
          videoNextToken: response.nextPageToken
        })
      })
    }
  }

  // setState를 잠시 없애고 Navigate에서 state를 보내기.
  clickedVideo = (video) => {
    // await this.props.youtube
    // .getCurrentVidInfo(video)
    // .then(res => {
    //   console.log(res);
    // })
    // .then(response => this.setState({
    //   currentVid: response.info,
    //   comments: response.comments.items,
    //   commentNextToken: response.comments.nextPageToken
    // }))
    // .then(() => {holding = true})
    // .catch((error) => console.log(error));

    // Navigate("/watch", {state: {
    //   currentVid: response.info,
    //   comments: response.comments.items,
    //   commentNextToken: response.comments.nextPageToken  
    // }});

    <Navigate to="/watch" />
  }

  getMoreComments = () => {
    return this.props.youtube
    .getComment(this.state.currentVid.id, this.state.commentNextToken)
    .then(response => {
      const comments = [...this.state.comments];
      comments.push(...response.items);
      this.setState({
        comments: comments,
        commentNextToken: response.nextPageToken
      })
    })
  }

  moveToMain = () => {
    this.props.youtube
    .getMostPopular()
    .then(response => this.setState({
      videos: response.items, 

      // 임시
      // currentVid: {}, 
      // 

      isSearched: false,
      videoNextToken: response.nextPageToken,
      searchQuery: ""
    }))
    .catch((error) => console.log(error))
  }

  // 왜 여기에 하위컴포넌트에서는 못부르고 여기서만 가능하지? 여기서도 prop으로 받는건데?
  convertCount = (num) => {
    return this.props.calc.convertCount(num);
  }

  calcDiffDate = (diffMinutes) => {
    return this.props.calc.getDiffTime(diffMinutes);
  }

  convertVideoDuration = (time) => {
    return this.props.calc.convertVideoDuration(time);
  }

  render() {
    const selected = Object.keys(this.state.currentVid).length !== 0 ? true : false;
    return (
      <>
        <Header
          moveToMain = {this.moveToMain} 
          onSearch = {this.searchVideos}
          onLogIn = {this.onLogIn}
          onLogOut = {this.onLogOut}
          userInfo = {this.state.users}
        />
        <section>
          <Routes>
            <Route 
            path='/watch'
            element={
              <Watch 
                currentVid={this.state.currentVid} 
                comments={this.state.comments}
                convertCount={this.convertCount}
                calcDiffDate={this.calcDiffDate}
                getMoreComments={this.getMoreComments}
                videos={this.state.videos}
                clickedVideo={this.clickedVideo}
                selected={selected}
                convertVideoDuration={this.convertVideoDuration}
                getMoreVideos={this.getMoreVideos}
              />
            }
            />
            <Route 
              path='/'
              element={
                <Home 
                  videos={this.state.videos}
                  clickedVideo={this.clickedVideo}
                  selected={selected}
                  convertCount={this.convertCount}
                  calcDiffDate={this.calcDiffDate}
                  convertVideoDuration={this.convertVideoDuration}
                  getMoreVideos={this.getMoreVideos}
                />
              }
            />
          </Routes>
        </section>
        <div className="App">
          <div className="circle"></div>
        </div>
      </>
    );
  }
}

export default App;
