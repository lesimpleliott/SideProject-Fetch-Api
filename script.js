// USERS
const fetchUsers = await fetch('https://jsonplaceholder.typicode.com/users'); 
const dataUsers = await fetchUsers.json(); 

// PHOTOS
const fetchPhotos = await fetch('https://jsonplaceholder.typicode.com/photos');
const dataPhotos = await fetchPhotos.json();

// POSTS
const fetchPosts = await fetch('https://jsonplaceholder.typicode.com/posts');
const dataPosts = await fetchPosts.json();

createUsersCard(dataUsers, dataPhotos);
showPosts(dataPosts);
closePopup();



function createUsersCard(dataUsers, dataPhotos) {
    const mainContainer = document.querySelector('#container');
    for (let i = 0; i < dataUsers.length; i++) {     
        const cardTag = document.createElement('div');
        cardTag.classList.add('card');
        cardTag.setAttribute('id', dataPhotos[i].id);

        const imageTag = document.createElement('img');
        imageTag.classList.add('card__image');
        imageTag.src = dataPhotos[i].url;
        
        const contentTag = document.createElement('div');
        contentTag.classList.add('card__content');
        
        const nameTag = document.createElement('h2');
        nameTag.classList.add('name');
        nameTag.textContent = dataUsers[i].name;

        const userTag = document.createElement('h3');
        userTag.classList.add('username');
        userTag.textContent = dataUsers[i].username;
        
        const mailTag = document.createElement('p');
        mailTag.classList.add('mail');
        mailTag.textContent = dataUsers[i].email;
        
        const cityTag = document.createElement('p');
        cityTag.classList.add('city');
        cityTag.textContent = dataUsers[i].address.city;
        
        contentTag.appendChild(nameTag);
        contentTag.appendChild(userTag);
        contentTag.appendChild(mailTag);
        contentTag.appendChild(cityTag);
        
        cardTag.appendChild(imageTag);
        cardTag.appendChild(contentTag);
        
        mainContainer.appendChild(cardTag);
    };
};

function showPosts(dataPosts) {
    const cards = document.querySelectorAll('.card'); 
    const postCard = document.querySelector('.postCard');
    
    for(let i=0; i<cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const postsUser = dataPosts.filter(item => item.userId === i+1);
    
            document.querySelector('body').style.overflowY = 'hidden';
            document.querySelector('main').style.filter = 'blur(10px)';

            // On affiche la popup card
            const posts = document.querySelector('#posts');
            posts.classList.toggle('showPost');
    
            // On créé les éléments et différents posts + idpost 
            for(let i=0; i<postsUser.length; i++) {
                const title = document.createElement('h2'); 
                title.innerText = `Titre : ${dataPosts[i].title}`;
                postCard.appendChild(title);
                const idPost = document.createElement('p');
                idPost.textContent = `id post : ${dataPosts[i].id}`;
                postCard.appendChild(idPost);
            };
        });
    };
};

function closePopup() {
    const closeButton = document.querySelector('.close');
    const posts = document.querySelector('#posts');
    const postCard = document.querySelector('.postCard');
    
    document.addEventListener('click', (event)=> {
        if(event.target === posts || event.target === closeButton) {
            close();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && posts.classList.contains('showPost')) {
            close();
        }
    });
    

    function close() {    
        document.querySelector('body').style.overflowY = 'auto';
        document.querySelector('main').style.filter = 'blur(0px)';
        // On masque la popup card 
        posts.classList.toggle('showPost');
        // On efface les posts 
        const postElement = postCard.querySelectorAll('p, h2');
        postElement.forEach(element => {
                element.remove(); 
        });
    };
};
