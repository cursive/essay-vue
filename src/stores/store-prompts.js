// This file manages the state and data for the essay review page.


import { defineStore } from 'pinia';
console.log("review")


// Tidy up essay daya
const essayData = `If someone in your family has a disease like cancer, heart conditions, and AIDS they may have to suffer pain and change their lifestyle. But they only are alive because of medicine. Back when medicine and vaccines weren’t invented or that advanced, diseases like Polio, Malaria, Asthma, etc., killed many people. Even getting a cold or fever could kill you. Nowadays all the medicines save many lives, but they are killing, too. 

All these vaccines weren’t tested on other humans, but on animals. Everything from mice to polar bears, new ways of saving people are tested first on animals. Animals that can’t speak or argue about us humans killing them. They have no say in living or dying. On average 20 million animals are killed through this testing. Many of them don’t get pain killers when they are slammed on the head, or get their legs chopped to see if they can adapt. 

That’s because a painkiller can affect the research and can mess up the reactions. Is it fair to test an animal get tested like this? Many scientists argue that it is necessary to save lives. The question is, are we the ones to chose who lives and who dies? Are we the ones to kill in order to increase our lifespans? 

We should work toward ways to decrease animal testing and find other ways that don’t involve such pain and killing. It should be worked out so that a company can use only a certain number of animals a year. Also, we could use a computer program that acts just like an animal with all of it’s behaviors and reactions. If it gives bad results, they can keep working until it says it’s ok. When that is done, they could use only a few animals to see if it worked. This would reduce the chance of animals getting killed. `

let htmlData = essayData;
htmlData = htmlData.replace(/\n/g, '</p><p>');
htmlData = `<p>${htmlData}</p>`;

console.log("htmlData\n", htmlData)

// Import prompt from jsons
import promptData from '@/assets/data/promptData.json';
console.log("promptData------", promptData)

function generateUniqueID() {
    return Math.floor(Math.random() * Date.now());
}


//Handle base URK based on localhost or web hosting
let baseURL = '';

if (window.location.hostname === 'localhost') {
    baseURL = "http://localhost:1234/";
} else {
    baseURL = "/";
}


//The store
//Feedback is the voerall feedback

export const useMainStore = defineStore('promptStore', {
    state: () => ({
        essay: htmlData,
        feedbacks: [],//overall feedback
        comments: [],//comments feedback
        prompts: promptData,//prompt we send to openai
        activePrompt: 0,//we only use one prompt, not needed anymore
        loaded: false,//has the response from openAI been loaded
        displayRubric: false,//Is the rubric modal open
        isReviewed: false//has the teacher reviewed all the comments and feedbacks
    }),
    getters: {
        getEssay: (state) => state.essay,
        getFeedbacks: (state) => state.feedbacks,
        getComments: (state) => state.comments,
        isAllReviewed: function () {
            // Check if all feedbacks and comments have been reviewed
            return (
                (this.feedbacks.length === 0 || this.feedbacks.every((feedback) => feedback.isApproved || feedback.isRejected)) &&
                (this.comments.length === 0 || this.comments.every((comment) => comment.isApproved || comment.isRejected))
            );
        }, isReviewed: function () {
            return this.isAllReviewed;
        }
    },

    actions: {
        setActivePrompt(index) {
            this.activePrompt = index
        },
        async sendToOpenAi() {
            console.log("fetching feedback AKA openaia resposes", this.prompts.length);
            let prompt = this.prompts[this.activePrompt].description;
            console.log(prompt);
            console.log("fetching feedbacks:" + baseURL + 'api/openai');
            try {
                const response = await fetch(baseURL + 'api/openai', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: prompt,
                        rubric: ""
                    }),
                });

                try {
                    console.log("Trying to read data");
                    const data = await response.json();
                    cleanupData(data);
                } catch (error) {
                    console.error("Error parsing response:", error);
                }
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        },

        toggleRubric() {
            console.log("toggle rubric")
            this.displayRubric = !this.displayRubric
        }
    },
});

//parse the data we get back from openAI and add each comment and voerall feedback to the state
function cleanupData(data) {
    console.log("cleanupData:", data);
    let targeted = [];
    let overall = [];
    if (data && typeof data.result.content === "string") {
        const content = data.result.content;

        const targetedIndex = content.indexOf("targetedFeedback");
        const overallIndex = content.indexOf("overallFeedback");
        const targetedStartIndex = content.indexOf("[", targetedIndex);
        const targetedEndIndex = content.indexOf("]", targetedStartIndex);
        const overallStartIndex = content.indexOf("[", overallIndex);
        const overallEndIndex = content.indexOf("]", overallStartIndex);
        if (targetedStartIndex !== -1 && targetedEndIndex !== -1) {
            const targetedContent = content.slice(targetedStartIndex, targetedEndIndex + 1);
            targeted = JSON.parse(targetedContent);
        }

        if (overallStartIndex !== -1 && overallEndIndex !== -1) {
            const overallContent = content.slice(overallStartIndex, overallEndIndex + 1);
            overall = JSON.parse(overallContent);
        }

        let store = useMainStore()
        console.log("targeted feedback:", targeted);

        const comments = targeted.map((comment) => ({
            id: generateUniqueID(),
            ...comment,
            isApproved: false,
            isRejected: false,
            isEditng: false,
            isHovering: false
        }));
        console.log("overall feedback:", overall);
        const feedbacks = overall.map((feedback) => ({
            id: generateUniqueID(),
            ...feedback,
            isEditing: false,
            isApproved: false,
        }));

        store.$patch((state) => {
            state.comments = comments;
            state.feedbacks = feedbacks;
            state.loaded = true
        });

        // Further processing or displaying the feedback
    } else {
        console.error("Invalid response format:", data);
    }
}