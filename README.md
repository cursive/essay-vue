# vue-project

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Install
- Vue chrome dev tools
- It also lets you inspect the store/state in real time


## API & Data
- Prompt lives in a json file
- We have our own API that we call to send the prompt to OpenAI
- We get 2 sets of data back
for comments: quoted text, feedback on quote, score, dimension
for overall feedback: feedback, score, dimension

## Router
Router is used for creating URLS, we have one for the essay review and will have one for list of essays


## Stores
We use a library called Pinia for the store & state
store-pormpt.js keeps the state of the app such as
- Jess's prompt that we load in from assets/data/promptData jason
- The complete prompt we send to openAI
- The comments and their approved/editing/reject state
- The overal feedback and their approved/editing/reject state
- The display status of thew rubric
- Has the teacher reviews all the comments and feedback
- Has the response come in from OpenAI

## Main Views
ReviewView the main essay
EssayList png of a list of essays


## Component views
CommentReview.vue
- A commment on the side of the essay

CommentsReview.vue
- A container for commments

EssayReview.vue
- The essay and highlights

FeedbackReview.vue
- The overall feedback

StartReview.vue
- The CTA for starting a review and submitting to student

Static vues:
- NavReview (top nav)
- RubricReview (rubric screenshot)
- StudentsReview (list of students)

## Overall how does the code work?
- The essay is stored in a variable and isnerted into the HTML
- The prompt is stored in json file
- When you hit start review, we send the prompt to OpenAI via our API on replit 
- We get a list of comments and a list of overral feedback from the API in json format
- We sotre them in the store
- CommentsReview.vue loops through comments to create individual CommentReview.vue for each vue
- EssayReview.vue looops thourgh the comments and highleghts the relevant text in the essay
- FeedbackReview.vue loops through the feedback to list out the overall feedback, 1 per rubric dimension

By and large we use the statre to manage everything
- The feedback and comment items have different CSS classes to reflect their editing/approved state
- When we edit/approve a comment we set it's state to approved/editing in the sotre and this will trigger a CSS class change
- When we reject a comment, we delete it from the store, and this remove the comment as well as the highlight
- When we hover over a highlight we use the store to set the corresping comment to highlight (and vice versa)

