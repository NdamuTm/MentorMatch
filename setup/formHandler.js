// Import Firebase modules
import { doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { auth } from '../Config/firebase.js'; // Import your Firebase config
// Import Firebase modules

const db = getFirestore();

// Function to save about me
export async function saveAboutMe(aboutMe, fullName) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        try {
            // Save about me and full name in Firestore
            await setDoc(doc(db, "users", userId), {
                aboutMe: aboutMe,
                fullName: fullName,
                uid: userId ,
            }, { merge: true });
            console.log("About Me and Full Name saved successfully!");
        } catch (error) {
            console.error("Error saving About Me:", error);
        }
    }
}

// Function to upload profile picture
export async function uploadProfilePicture(file) {
    async function savepic(url) {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            try {
                await setDoc(doc(db, "users", userId), {
                    profilePic: url,
                }, { merge: true });
                console.log("pic saved successfully!");
            } catch (error) {
                console.error("Error saving role:", error);
            }
        }
    }
    const user = auth.currentUser;
    if (user) {
        const storage = getStorage(); // Initialize storage
        const storageRef = ref(storage, `profilePictures/${user.uid}.png`);

        try {
            await uploadBytes(storageRef, file); // Upload the file
            const profilePicUrl = await getDownloadURL(storageRef); // Get the download URL
            await savepic(profilePicUrl); // Save the URL in Firestore
            console.log("Profile picture uploaded successfully!");
            return profilePicUrl; // Return the URL for saving in Firestore
        } catch (error) {
            const profilePicUrl ='https://firebasestorage.googleapis.com/v0/b/rmatch-54ff8.appspot.com/o/default.jpg?alt=media&token=925f637a-fcaf-43c7-af63-7762abc24192';
            console.error("Error uploading profile picture:", error);
            return profilePicUrl; // Return an empty string if there's an error
        }
    }
}

// Function to save user role
export async function saveRoles(role) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        try {
            await setDoc(doc(db, "users", userId), {
                role: role,
            }, { merge: true });
            console.log("Role saved successfully!");
        } catch (error) {
            console.error("Error saving role:", error);
        }
    }
}// Function to save education
export async function saveEducation(school, educationLevel, fieldOfStudy, startDate, endDate, currentEducation) {
    const user = auth.currentUser; // Ensure user is authenticated
    if (user) {
        const userId = user.uid;
        try {
            await setDoc(doc(db, "users", userId), {
                education: {
                    school,
                    educationLevel,
                    fieldOfStudy,
                    startDate,
                    endDate,
                    currentEducation,
                },
            }, { merge: true });
            console.log("Education saved successfully!");
        } catch (error) {
            console.error("Error saving Education:", error);
        }
    }
}

// Function to save skills
export async function saveSkill(skill) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        try {
            await setDoc(doc(db, "users", userId), {
                skills: {
                    skill,
                },
            }, { merge: true });
            console.log("Skill saved successfully!");
        } catch (error) {
            console.error("Error saving Skill:", error);
        }
    }
}

// Function to save work experience
export async function saveWorkExperience(workData) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        try {
            await setDoc(doc(db, "users", userId), {
                workExperience: workData,
            }, { merge: true });
            console.log("Work Experience saved successfully!");
        } catch (error) {
            console.error("Error saving Work Experience:", error);
        }
    }
}
