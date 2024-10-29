// main.js

// Import Firebase authentication functions
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth, onAuthStateChanged } from "/Config/firebase.js";

// Track the current user's authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        console.log("User is logged in:", user);
    } else {
        window.location.href = "/Login";
    }
});

// Logout function to be triggered by a logout button
async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User logged out successfully.");
        window.location.href = "/Login"; // Redirect to login page
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

// main.js
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';
import { db } from '/Config/firebase.js'; // Ensure you're importing your Firestore instance

const postsContainer = document.getElementById('posts');

// Function to fetch and display posts from Firestore
async function fetchPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        let postsHTML = '';

        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            postsHTML += `
                <div class="post slider-item">
                    <div class="flex">
                        <div class="post-img">
                            <img src="${postData.imageUrl || '/asset/Images/default-image.svg'}" alt="">
                        </div>
                        <div class="post-details">
                            <h3>${postData.title}</h3>
                            <p>${new Date(postData.createdAt.seconds * 1000).toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <h3>${postData.title}</h3>
                        <p>${postData.description}</p>
                    </div>
                    <div class="react">
                        <div class="like">
                            <img src="/asset/Images/like.svg" alt=""> ${postData.likes || 0}
                        </div>
                        <div class="comment">
                            <img src="/asset/Images/comment.svg" alt=""> ${postData.comments || 0}
                        </div>
                        <div class="share">
                            <img src="/asset/Images/share.svg" alt=""> ${postData.shares || 0}
                        </div>
                    </div>
                </div>
            `;
        });

        postsContainer.innerHTML = postsHTML; // Insert the generated HTML into the container
    } catch (error) {
        console.error('Error fetching posts: ', error);
    }
}
// Function to fetch and display mentors from Firestore
async function fetchMentors() {
    try {
        const querySnapshot = await getDocs(collection(db, 'mentors'));
        let mentorsHTML = '';

        querySnapshot.forEach((doc) => {
            const mentorData = doc.data();
            mentorsHTML += `
                <div class="mentor slider-item">
                    <div class="flex">
                        <div class="mentor-img">
                            <img src="${mentorData.imageUrl || '/asset/Images/default-mentor-image.svg'}" alt="">
                        </div>
                        <div class="mentor-details">
                            <h3>${mentorData.name}</h3>
                            <p>${mentorData.subjects.join(' • ') || 'No subjects listed'}</p>
                        </div>
                        <div class="save">
                            <img src="/asset/Images/Save.svg" alt=""> Follow
                        </div>
                    </div>
                    <div class="tags">
                        ${mentorData.experience ? `<p><img src="/asset/Images/tick.svg"> ${mentorData.experience}</p>` : ''}
                        ${mentorData.location ? `<p><img src="/asset/Images/tick.svg"> Location: ${mentorData.location}</p>` : ''}
                        ${mentorData.availability ? `<p><img src="/asset/Images/tick.svg"> Availability: ${mentorData.availability}</p>` : ''}
                    </div>
                    <div class="buttons">
                        <button class="btn btn-lite">Connect</button>
                        <button class="btn">Message</button>
                    </div>
                </div>
            `;
        });

        mentorsContainer.innerHTML = mentorsHTML; // Insert the generated HTML into the container
    } catch (error) {
        console.error('Error fetching mentors: ', error);
    }
}

// Call the fetch functions to load the posts and mentors when the page is loaded
fetchPosts();
fetchMentors();