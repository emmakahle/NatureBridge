<template>
  <Compass
    :stage="stage"
    :onSuccess="onSuccess"
    :instructions="'The red pointer on your compass in the upper right corner will always point north. The mountain pass trail on your map is in a southeast direction. Click the right and left arrows to turn your view and head in the correct direction down the trail. '" />
</template>

<script>
  import Compass from './Compass';

  export default {
    name: 'CompassTutorial',
    components: { Compass },
    props: ['switchScene'],
    data() {
      return {
        stage: {
          file: 'compass_tutorial_hr.png',
          originalWidth: 3969,
          originalHeight: 900,
          offsetDeg: 0,
          initialRotation: 90,
          stepDeg: 30,
          restrictRotation: true,
          failMessage: 'That\'s not the right direction!\nCheck your compass to make sure you are facing the right way.',
          compassTransform: x => x / 2,
          rotateRange: [0, 240],
          successRange: [180, 240]
        }
      }
    },
    methods: {
      onSuccess() {
        this.switchScene('Intro2');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
