<template>
  <section class="vue-component">
    <h3>Questo è un componente VUE</h3>
    <p>State in VUE: {{ refTestVar }}</p>
    <div>
      <form @submit.prevent="addToList">
        <button class="material-button" type="submit">Add Item To List</button>
      </form>
      <button class="material-button" @click="toggleTestVar">
        Toogle state
      </button>

      <div v-if="Object.values(refTestItems).length">
        <div
          v-for="testItem in Object.values(refTestItems)"
          v-bind:key="testItem.name"
        >
          {{ testItem.name.first }} {{ testItem.name.last }} | {testItem.email}
          ({{ testItem.gender }})
        </div>
      </div>
    </div>
    <slot name="astro-component"></slot>
  </section>
</template>

<style>
.material-button {
  margin: 0.5rem 0;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f5f5f5;
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #bdbdbd;
  }
  &:focus {
    outline: none;
  }
}

.vue-component {
  background-color: #41b883;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  display: block;
  width: 100%;
  text-align: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { testVar, addTestItem, testItems } from "../../stores/testStore";
import { useStore } from "@nanostores/vue";
import { logger } from "@nanostores/logger";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineComponent({
  data() {
    const refTestVar = useStore(testVar) || false;
    const refTestItems = useStore(testItems) || [];
    const destroy = logger({
      testVar: testVar,
    });
    return {
      message: "Data fetched from API:",
      randomUser: { email: null, name: null, gender: null },
      hardcodedItemInfo: {
        id: "astronaut-figurine",
        name: "Astronaut Figurine",
        imageSrc: "/assets/img/png/brain_exp.png",
      },
      refTestVar,
      refTestItems,
      destroy,
    };
  },
  methods: {
    async fetchUser() {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const { email, name, gender } = data.results[0];
      return { email, name, gender };
    },
    addToList(e) {
      e.preventDefault();
      testVar.set(true);
      this.fetchUser().then((user) => {
        this.randomUser = user;
      });
      if (this.randomUser.email) {
        addTestItem(this.randomUser);
      }
    },
    toggleTestVar() {
      testVar.set(!this.refTestVar);
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    let hero = gsap.timeline();
    hero.fromTo(
      ".material-button",
      { opacity: 0, transform: "translateY(-40px)" },
      {
        opacity: 1,
        transform: "translateY(0px)",
        ease: "power1.inOut",
        duration: 5.5,
      }
    );

    this.fetchUser().then((user) => {
      this.randomUser = user;
    });
  },
});
</script>
