


export const useMainStore = defineStore('promptStore', {
    state: () => ({
        feedbacks: [],
    }),
    getters: {
        getFeedbacks: (state) => state.feedbacks,
    },
    mutations: {
        setFeedbacks(state, feedbacks) {
            state.feedbacks = feedbacks;
        },
    },
    actions: {
        async fetchFeedbacks() {
            try {
                // Make your API call here to fetch the feedbacks data
                const response = await fetch('your-api-endpoint');
                const data = await response.json();

                // Parse the content as JSON
                const parsedData = JSON.parse(data.result.content);

                // Initialize feedbacks array
                let feedbacks = [];

                // Check if fullResults is present
                if (parsedData.fullResults) {
                    // Assign the targetedFeedback and overallFeedback properties to jsonData
                    const { targetedFeedback, overallFeedback } = parsedData.fullResults;
                    feedbacks = overallFeedback.map((feedback) => ({
                        id: generateUniqueID(),
                        ...feedback,
                        isApproved: false,
                    }));
                } else {
                    // If fullResults is not present, assign the parsedData object to jsonData
                    feedbacks = parsedData.overallFeedback.map((feedback) => ({
                        id: generateUniqueID(),
                        ...feedback,
                        isApproved: false,
                    }));
                }

                // Update the store's state
                this.setFeedbacks(feedbacks);
            } catch (error) {
                // Handle error scenarios
                console.error('Error fetching feedbacks:', error);
            }
        },
    },
});
const { targetedFeedback, overallFeedback } = parsedData.fullResults;
