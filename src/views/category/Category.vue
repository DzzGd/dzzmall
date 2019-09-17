<template>
  <div class="Category">
    <ul class="content">
      <li>1a</li>
      <li>2a</li>
      <li>3a</li>
      <li>4a</li>
      <li>5a</li>
      <li>6a</li>
      <li>7a</li>
      <li>8a</li>
      <li>9a</li>
      <li>10a</li>
      <li>11a</li>
      <li>12a</li>
      <li>13a</li>
      <li>14a</li>
      <li>15a</li>
      <li>16a</li>
      <li>17a</li>
      <li>18a</li>
      <li>19a</li>
      <li>20a</li>
      <li>21a</li>
      <li>22a</li>
      <li>23a</li>
      <li>24a</li>
      <li>25a</li>
      <li>26a</li>
      <li>27a</li>
      <li>28a</li>
      <li>29a</li>
      <li>30a</li>
      <li>31a</li>
      <li>32a</li>
      <li>33a</li>
      <li>34a</li>
      <li>35a</li>
      <li>36a</li>
      <li>37a</li>
      <li>38a</li>
      <li>39a</li>
      <li>40a</li>
      <li>41a</li>
      <li>42a</li>
      <li>43a</li>
      <li>44a</li>
      <li>45a</li>
      <li>46a</li>
      <li>47a</li>
      <li>48a</li>
      <li>49a</li>
      <li>50a</li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: "Category",
  data() {
    return {
      bs: null
    };
  },
  mounted() {
    this.bs = new BScroll(document.querySelector('.Category'))
  },
  methods: {}
};
</script>
<style scoped>
.Category{
  height: 300px;
  background-color: azure;
  /* overflow-y: scroll; */
}
</style>