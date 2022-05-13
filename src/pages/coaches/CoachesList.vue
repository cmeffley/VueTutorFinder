<template>
<div>
<!-- !!error => converts the error string to a truthy/falsey value -->
    <base-dialog :show="!!error" title="An Error has occurred" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <tutor-filter @change-filter="setFilters"></tutor-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadTutors(true)">Refresh</base-button>
                <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Log In to Register as a Tutor</base-button>
                <base-button v-if="isLoggedIn && !isTutor && !isLoading" link to="/register">Register as a Tutor</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasTutors">
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
</div>
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
            isLoading: false,
            error: null,
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
            return !this.isLoading && this.$store.getters['tutors/hasTutors'];
        },
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    },
    created() {
        this.loadTutors();
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadTutors(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('tutors/loadTutors', { forceRefresh: refresh});
            } catch(error) {
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
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