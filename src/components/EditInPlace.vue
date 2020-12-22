<template>
  <div>
    <q-input
      v-if="typeof props.row[col.name] === &quot;number&quot;"
      type="number"
      v-model.number="props.row[col.name]"
      dense
    />
    <div v-else-if="typeof props.row[col.name] === &quot;object&quot;">
      <q-input
        v-for="(e, i) in props.row[col.name]"
        :key="i"
        v-model="props.row[col.name][i]"
        :label="typeof i === &quot;string&quot; ? i : &quot;&quot;"
        dense
      />
    </div>
    <q-input
      v-else
      v-model="props.row[col.name]"
      dense
    />
  </div>
</template>
<script>
export default {
  props: {
    props: Object,
    col: String
  }
}
</script>
