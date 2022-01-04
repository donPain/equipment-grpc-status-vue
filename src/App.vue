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
import { Component, Vue, Watch } from "vue-property-decorator";
import EquipmentStatusComponent from "@/components/EquipmentStatusComponent.vue";
import EquipmentStatus from "@/types/EquipmentStatus";
import "vue-loading-overlay/dist/vue-loading.css";

@Component({
  components: { EquipmentStatusComponent },
})
export default class App extends Vue {
  equipment: EquipmentStatus = {
    equipment: "",
    owner: "",
    status: "",
    since: "",
  };
  equipments: EquipmentStatus[] = [];
  search: any;
  isLoading: boolean | undefined;
  pollData(): void {
    this.isLoading = true;
    setInterval(async () => {
      const response = await fetch(
        "http://localhost:2308/getEquipmentStatus/BOMFUTURO_DEV"
      );
      const data = await response.json();
      this.isLoading = false;
      this.equipments = data;
    }, 3000);
  }
  created(): void {
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
  min-width: 350px;
}
</style>
