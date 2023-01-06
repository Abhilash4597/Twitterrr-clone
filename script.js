let tweetOffset = 0;
let runningCriticalFunction = false;

async function getTweetsAndInsertHTML() {
    if (runningCriticalFunction) {
    return;
    }
    runningCriticalFunction = true;
    const result = await fetch(
    `https://twitter-backend-6yot.onrender.com/tweet/recent?offset=${tweetOffset}`
  ); // Paginated API

    const tweets = await result.json();

  // console.log(tweets.data);

    tweetOffset = tweetOffset + tweets.data.length;

    document.querySelector('.otheruser').insertAdjacentHTML(
    'beforeend',
    tweets.data
        .map(tweet => {
        const date = new Date(tweet.creationDatetime);

        return `
            <div class="person3 otheruser id=${tweet._id}">
                <div class="flex postHeading">
                    <div class="userdetails">
                        <div class="otherpropic space-in-word-of-tweet">
                        <img src="https://source.unsplash.com/45x45/?boy" alt="img" class="otherimg" />
                        </div>
                        <div class="otherusername space-in-word-of-tweet">Shaggy</div>
                        <div class="otherusertag space-in-word-of-tweet">@Shaggy</div>
                        <div class="uplodetime space-in-word-of-tweet">17m</div>
                    </div>
                    <div class="flex">
                    <button data-id=${tweet._id} class="tweet-edit" id="tweet-edit">
                    Edit
                </button>
                <button data-id=${tweet._id} class="tweet-delete" id="tweet-delete">
                    Delete
                </button>
                </div> 
                </div> 
                    <div class="usercontent id=span-${tweet._id}">
                        ${tweet.title}
                    </div>
                    <div class="userupimage">
                        <img src="https://source.unsplash.com/480x360/?fruit" alt="img" class="givenimage" />
                    </div>
                    <div class="usertweetoptions">
                        <div class="replybox">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-message-circle">
                            <path
                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                            class="reply" />
                        </svg>
                        <div class="replycount">107</div>
                        </div>
                        <div class="replybox">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-repeat">
                            <polyline points="17 1 21 5 17 9"></polyline>
                            <path d="M3 11V9a4 4 0 0 1 4-4h14" class="retgreen"></path>
                            <polyline points="7 23 3 19 7 15"></polyline>
                            <path d="M21 13v2a4 4 0 0 1-4 4H3" class="retgreen"></path>
                        </svg>
                        <div class="tweetcount">203</div>
                        </div>
                        <div class="replybox">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-heart">
                            <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            class="heartred"></path>
                        </svg>
                        <div class="heartcount">1.3k</div>
                        </div>
                        <div class="replybox">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-share">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" class="reply"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        </div>
                    </div>
                    </div>
                    <div class="bottomBorder"></div>`;
        })
        .join('')
    );
    runningCriticalFunction = false;
}

window.onload = async () => {
    getTweetsAndInsertHTML();
};


document.addEventListener('click', async event => {
    if (event.target.classList.contains('tweetpost')) {
        const tweetText = document.querySelector('.tweet-post-text').value;
        console.log(tweetText)
        const data = {
        title: tweetText,
        text: 'Random Value',
        userId: '12345',
        };

        const tweetResponse = await fetch(
        'https://twitter-backend-6yot.onrender.com/tweet/create',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        );

        const tweet = await tweetResponse.json();

        if (tweet.status !==200) {
        alert(tweet.message);
        return;
        }

        document.querySelector('.tweet-post-text').value = '';
        alert(tweet.message);
    }

    if (event.target.classList.contains('tweet-delete')) {
    if (confirm('Are you sure you want to delete this tweet?')) {
        const tweetId = event.target.getAttribute('data-id');

        const data = {
        tweetId,
        userId: '12345',
        };

        const response = await fetch(
        'https://twitter-backend-6yot.onrender.com/tweet/delete',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.status !== 200) {
            alert(result.message);
            return;
        }

        alert('Tweet deleted successfuly');
        document.getElementById(tweetId).remove();
    }
    }

    if (event.target.classList.contains('tweet-edit')) {
    const tweetId = event.target.getAttribute('data-id');

    const span = document.getElementsByClassName('usercontent' + tweetId);

    const tweetText = prompt('Enter new tweet text', span.innerText);

    const data = {
        tweetId,
        title: tweetText,
        text: 'Random value',
        userId: '12345',
    };

    const response = await fetch(
        'https://twitter-backend-6yot.onrender.com/tweet/update',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (result.status !== 200) {
        alert(result.message);
        return;
    }

    alert('Updated Successfully');
    span.innerText = tweetText;
    }

  // if(event.target.classList.contains('show_more')) {
  //     getTweetsAndInsertHTML();
  // }
});

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // console.log(scrollTop, scrollHeight, clientHeight);

    if (scrollTop + clientHeight >= scrollHeight - 20) {
    getTweetsAndInsertHTML();
    }
});

// Callback
// Promises
// Async Await

// const result2 = await fetch('https://api.github.com/users');

//     console.log(result2);

//     const a = await result2.json();

//     console.log(a);

// fetch('http://localhost:3000/tweet/recent').then((result) => {

//     fetch('http://localhost:3000/user/profile', {}).then((res) => {

//     })
// })

// fetch('https://api.github.com/users').then((result2) => {
//     console.log(result2);
// })

// fetch('http://localhost:3000/tweet/recent').then(async (res) => {
//     const result = await res.json();

//     console.log(result);
//     if(result.status !== 200) {
//         alert(result.message);
//     }
// }).catch((err) => {
//     alert(err);
// })

// const dataArray = tweets.data;

//     // for(let i = 0; i < dataArray.length; i++) {
//     //     dataArray[i] = "<h1>Hello</h1>";
//     // }

//     const data = dataArray.map((a) => {
//         a = `<h1>${a.title}</h1>`;
//         return a;
//     })

//     console.log(data);

// tweets.data.forEach((tweet) => {
//     const date = new Date(tweet.creationDatetime);

//     document.getElementById('tweet-body').insertAdjacentHTML('beforeend', `<div class="tweets">
//         <div class="tweet-profile-image">
//         <img
//             src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
//             alt="profile image"
//         />
//         </div>
//         <div class="tweet">
//         <div class="tweet-header">
//             <div class="tweet-user-info">
//             <p><strong>Rohan Roshan</strong></p>
//             <p>@rohanroshan</p>
//             <p>${date.toDateString()}</p>
//             </div>
//             <div class="tweet-three-dots-menu">
//             <button>
//                 <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                     fill="#5b7083"
//                     d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75z"
//                 ></path>
//                 </svg>
//             </button>
//             </div>
//         </div>
//         <div class="tweet-body">
//             <span>${tweet.title}
//             </span>
//         </div>
//         </div>
//     </div>`
//     );
// });

