<template>
  <div class="wrapper">
    <ul class="content">
      <li>测试滑动列表1</li>
      <li>测试滑动列表2</li>
      <li>测试滑动列表3</li>
      <li>测试滑动列表4</li>
      <li>测试滑动列表5</li>
      <li>测试滑动列表6</li>
      <li>测试滑动列表7</li>
      <li>测试滑动列表8</li>
      <li>测试滑动列表9</li>
      <li>测试滑动列表10</li>
      <li>测试滑动列表11</li>
      <li>测试滑动列表12</li>
      <li>测试滑动列表13</li>
      <li>测试滑动列表14</li>
      <li>测试滑动列表15</li>
      <li>测试滑动列表16</li>
      <li>测试滑动列表17</li>
      <li>测试滑动列表18</li>
      <li>测试滑动列表19</li>
      <li>测试滑动列表20</li>
      <li>测试滑动列表21</li>
      <li>测试滑动列表22</li>
      <li>测试滑动列表23</li>
      <li>测试滑动列表24</li>
      <li>测试滑动列表25</li>
      <li>测试滑动列表26</li>
      <li>测试滑动列表27</li>
      <li>测试滑动列表28</li>
      <li>测试滑动列表29</li>
      <li>测试滑动列表30</li>
      <li>测试滑动列表31</li>
      <li>测试滑动列表32</li>
      <li>测试滑动列表33</li>
      <li>测试滑动列表34</li>
      <li>测试滑动列表35</li>
      <li>测试滑动列表36</li>
      <li>测试滑动列表37</li>
      <li>测试滑动列表38</li>
      <li>测试滑动列表39</li>
      <li>测试滑动列表40</li>
      <li>测试滑动列表41</li>
      <li>测试滑动列表42</li>
      <li>测试滑动列表43</li>
      <li>测试滑动列表44</li>
      <li>测试滑动列表45</li>
      <li>测试滑动列表46</li>
      <li>测试滑动列表47</li>
      <li>测试滑动列表48</li>
      <li>测试滑动列表49</li>
      <li>测试滑动列表50</li>
      <li>测试滑动列表51</li>
      <li>测试滑动列表52</li>
      <li>测试滑动列表53</li>
      <li>测试滑动列表54</li>
      <li>测试滑动列表55</li>
      <li>测试滑动列表56</li>
      <li>测试滑动列表57</li>
      <li>测试滑动列表58</li>
      <li>测试滑动列表59</li>
      <li>测试滑动列表60</li>
      <li>测试滑动列表61</li>
      <li>测试滑动列表62</li>
      <li>测试滑动列表63</li>
      <li>测试滑动列表64</li>
      <li>测试滑动列表65</li>
      <li>测试滑动列表66</li>
      <li>测试滑动列表67</li>
      <li>测试滑动列表68</li>
      <li>测试滑动列表69</li>
      <li>测试滑动列表70</li>
      <li>测试滑动列表71</li>
      <li>测试滑动列表72</li>
      <li>测试滑动列表73</li>
      <li>测试滑动列表74</li>
      <li>测试滑动列表75</li>
      <li>测试滑动列表76</li>
      <li>测试滑动列表77</li>
      <li>测试滑动列表78</li>
      <li>测试滑动列表79</li>
      <li>测试滑动列表80</li>
      <li>测试滑动列表81</li>
      <li>测试滑动列表82</li>
      <li>测试滑动列表83</li>
      <li>测试滑动列表84</li>
      <li>测试滑动列表85</li>
      <li>测试滑动列表86</li>
      <li>测试滑动列表87</li>
      <li>测试滑动列表88</li>
      <li>测试滑动列表89</li>
      <li>测试滑动列表90</li>
      <li>测试滑动列表91</li>
      <li>测试滑动列表92</li>
      <li>测试滑动列表93</li>
      <li>测试滑动列表94</li>
      <li>测试滑动列表95</li>
      <li>测试滑动列表96</li>
      <li>测试滑动列表97</li>
      <li>测试滑动列表98</li>
      <li>测试滑动列表99</li>
      <li>测试滑动列表100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      pullUpLoad: true,
    });
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.scroll.on("pullingUp", () => {
        console.log("上拉加载更多");
      });
    });
  },
};
</script>

<style scoped>
.wrapper {
  height: 300px;
  background-color: pink;
  overflow: hidden;
}
</style>
