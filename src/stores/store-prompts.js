// prompts.js (store)


import { defineStore } from 'pinia';
console.log("review")
//const essayData = "In Paul Bogard's article “Let there be dark” he's building an arguement to persuade his audience to preserve natural darkness. Bogard builds his arguement in a few different ways. Bogard uses a personal story, appeals to people's emotions, and states benefits of natural darkness. By using a personal story Bogard allows his audience to connect to him. If his audience can relate or even understand his story they will be more willing to agree with him. The personal story also shows that the issue of preserving natural darkness isn't just another topic to write about but something that he is actually passionate for. In his personal story Bogard uses great imagery making the audience picture what he saw and maybe make them want to experience it too. \n\nBogard uses pathos by stating examples that appeal to people's emotions. In the article he wrote “Those of us over 35 are perhaps among the last generation to have known truly dark nights.” This statement appeals more to the younger generations emotion. By stating this people who are younger then 35 might feel that they were robbed of the oppurtunity to experience the real beauty of natural darkness. This would proably help his younger audience to agree with him because they might want the chance to see the real beauty of natural darkness.\n\nBogard writes about the benefits that natural darkness actually produces. In the article he talks about how darkens actually helps the body produce a hormone that keeps certain cancers from developing. He also includes how darkness helps and is neccessary for certain animals. These examples will help his audience see that he is arguing for some benefical for people. This also helps appeal to an audience that might not care for the beauty of darkness but care for their own personal health. \n\nBogard uses different features in order to persuade his audience. The different features also help him in appealing to a broader audience."
const essayData = `If someone in your family has a disease like cancer, heart conditions, and AIDS they may have to suffer pain and change their lifestyle. But they only are alive because of medicine. Back when medicine and vaccines weren’t invented or that advanced, diseases like Polio, Malaria, Asthma, etc., killed many people. Even getting a cold or fever could kill you. Nowadays all the medicines save many lives, but they are killing, too. 

All these vaccines weren’t tested on other humans, but on animals. Everything from mice to polar bears, new ways of saving people are tested first on animals. Animals that can’t speak or argue about us humans killing them. They have no say in living or dying. On average 20 million animals are killed through this testing. Many of them don’t get pain killers when they are slammed on the head, or get their legs chopped to see if they can adapt. 

That’s because a painkiller can affect the research and can mess up the reactions. Is it fair to test an animal get tested like this? Many scientists argue that it is necessary to save lives. The question is, are we the ones to chose who lives and who dies? Are we the ones to kill in order to increase our lifespans? 

We should work toward ways to decrease animal testing and find other ways that don’t involve such pain and killing. It should be worked out so that a company can use only a certain number of animals a year. Also, we could use a computer program that acts just like an animal with all of it’s behaviors and reactions. If it gives bad results, they can keep working until it says it’s ok. When that is done, they could use only a few animals to see if it worked. This would reduce the chance of animals getting killed. `

import promptData from '@/assets/data/promptData.json';
console.log("promptData------", promptData)
let htmlData = essayData;
htmlData = htmlData.replace(/\n/g, '</p><p>');
htmlData = `<p>${htmlData}</p>`;

console.log("htmlData\n", htmlData)

function generateUniqueID() {
    return Math.floor(Math.random() * Date.now());
}

let baseURL = '';

if (window.location.hostname === 'localhost') {
    baseURL = "http://localhost:1234/";
} else {
    baseURL = "/";
}
export const useMainStore = defineStore('promptStore', {
    state: () => ({
        essay: htmlData,
        feedbacks: [],
        comments: [],
        prompts: promptData,
        activePrompt: 0,
        loaded: false,
        displayRubric: false,
        isReviewed: false
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