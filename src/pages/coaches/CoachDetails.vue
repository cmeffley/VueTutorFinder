<template>
<div>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}/hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2>Interested? Contact Me!</h2>
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas"
                :key="area"
                :type="area"
                :title="area"
            >
            </base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>
</div>
</template>

<script>
import BaseBadge from '../../components/UI/BaseBadge.vue';

export default {
    components: { BaseBadge },
    props: ['id'],
    data() {
        return {
            selectedTutor: null,
        }
    },
    computed: {
        fullName() {
            return this.selectedTutor.firstName + ' ' + this.selectedTutor.lastName;
        },
        areas() {
            return this.selectedTutor.areas;
        },
        rate() {
            return this.selectedTutor.hourlyRate;
        },
        description() {
            return this.selectedTutor.description;
        },
        contactLink() {
            return this.$route.path + '/' + this.id + '/contact';
        }
    },
    created() {
        this.selectedTutor = this.$store.getters['tutors/tutors'].find(
            (tut) => tut.id === this.id);
    },
}
</script>