// 每次只要更改icons里面的svg就可以了

import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'; // svg组件

Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
