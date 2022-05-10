<template>
    <section>
        <tutor-filter @change-filter="setFilters"></tutor-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button v-if="!isTutor" link to="/register">Register as a Tutor</base-button>
            </div>
            <ul v-if="hasTutors">
                <tutor-item v-for="tutor in filteredTutors"
                    :key="tutor.id"
                    :id="tutor.id"
                    :first-name="tutor.firstName"
                    :last-name="tutor.lastName"
                    :areas="tutor.areas"
                    :rate="tutor.hourlyRate"
                ></tutor-item>
            </ul>
            <h3 v-else>No Tutors Found</h3>
        </base-card>
    </section>
</template>

<script>
import TutorItem from '../../components/tutors/TutorItem.vue';
import TutorFilter from '../../components/tutors/TutorFilter.vue';

    export default {
        components: {
            TutorItem,
            TutorFilter,
        },
        data() {
            return {
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true
                }
            }
        },
        computed: {
            isTutor() {
                return this.$store.getters['tutors/isTutor'];
            },
            filteredTutors() {
               const tutors = this.$store.getters['tutors/tutors'];
               return tutors.filter(tut => {
                  if (this.activeFilters.frontend && tut.areas.includes('frontend')) {
                      return true;
                  }
                  if (this.activeFilters.backend && tut.areas.includes('backend')) {
                      return true;
                  }
                  if (this.activeFilters.career && tut.areas.includes('career')) {
                      return true;
                  }
                  return false;
               });
            },
            hasTutors() {
                return this.$store.getters['tutors/hasTutors'];
            }
        },
        methods: {
            setFilters(updatedFilters) {
                this.activeFilters = updatedFilters;
            },
        },
    };
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>