<template>
    <section>
        Filter
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button link to="/register">Register as a Tutor</base-button>
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

    export default {
        components: {
            TutorItem,
        },
        computed: {
             filteredTutors() {
                return this.$store.getters['tutors/tutors'];
            },
            hasTutors() {
                return this.$store.getters['tutors/hasTutors'];
            }
        },
    }
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