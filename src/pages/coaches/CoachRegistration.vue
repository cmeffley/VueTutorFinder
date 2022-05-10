<template>
    <section>
        <base-card>
            <h2>Register as a Tutor</h2>
            <tutor-form @save-data="saveData"></tutor-form>
        </base-card>
    </section>
</template>

<script>
import TutorForm from '../../components/tutors/TutorForm.vue'
import BaseCard from '../../components/UI/BaseCard.vue'

export default {
  components: { TutorForm, BaseCard },
  methods: {
      saveData(formData) {
          this.$store.dispatch('tutors/addTutorAction', formData);
          this.$router.push('/coaches')
        // this.$router.replace('/coaches') Same as above but you can't go back
      },
  },
    
}
</script>