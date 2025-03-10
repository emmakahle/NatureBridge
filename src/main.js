import Vue from 'vue'
import VueRouter from 'vue-router';
import Meta from 'vue-meta'

Vue.options.devtool = true;

import App from './App.vue'
import GameNew from './GameNew.vue'
import Editor from './Editor.vue'
import Welcome from './Welcome.vue'
import trivia from './trivia.js';
import Scrapbook from './common/Scrapbook.vue';

Vue.use(VueRouter);
Vue.use(Meta);

const router = new VueRouter({
  routes: [
    { path: '', component: Welcome },
    { path: '/game', component: GameNew },
    { path: '/editor', component: Editor },
    { path: '/scrapbook', component: Scrapbook }
  ]
});

export const globalStore = new Vue({
  data() {
    return {
      attrs: {},
      visited: [],
      journals: [],
      badges: [],
      triviaRemaining: trivia,
      triviaScore: {
        correct: 0,
        total: 0
      }
    }
  },
  methods: {
    visitLocation(name) {
      this.visited.push(name);
    },
    hasVisited(name) {
      return this.visited.indexOf(name) > -1;
    },
    addJournal(title, response) {
      this.journals.push({
        title: title,
        response: response
      })
    },
    getTrivia() {
      return this.triviaRemaining.shift();
    },
    addTriviaResult(correct) {
      this.triviaScore.total++;
      if(correct) {
        this.triviaScore.correct++;
      }

      if(this.triviaScore.correct >= 5 &&
        !this.hasBadge('park_trivia')) {
          this.earnBadge('park_trivia');
      }
    },
    set(attr, value) {
      this.attrs[attr] = value;
    },
    get(attr) {
      return this.attrs[attr];
    },
    earnBadge(name) {
      if(this.badges.indexOf(name) < 0) {
        this.badges.push(name);
      }
    },
    hasBadge(name) {
      return this.badges.indexOf(name) >= 0;
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
