<template>
  <div>
    <li v-for="(equipment, i) in equipments" :key="i" class="li-class">
      <EquipmentStatusComponent
        :equipmentId="equipment.equipment"
        :equipmentSince="equipment.since"
        :equipmentOwner="equipment.owner"
        :equipmentStatus="equipment.status"
        class="padding-Equipment"
      >
      </EquipmentStatusComponent>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EquipmentStatusComponent from "@/components/EquipmentStatusComponent.vue";
import EquipmentStatus from "@/types/EquipmentStatus";

@Component({
  components: {
    EquipmentStatusComponent,
  },
})
export default class App extends Vue {
  equipments = [];
  pollData() {
    setInterval(async () => {
      const response = await fetch(
        "http://localhost:2308/getEquipmentStatus/BOMFUTURO_DEV"
      );
      const data = await response.json();
      this.equipments = data;
    }, 1000);
  }
  created() {
    this.pollData();
  }
}
</script>
<style>
.li-class {
  display: inline-flex;
  align-items: center;
}
.padding-Equipment {
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  width: auto;
}
</style>
