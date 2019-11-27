import { configure } from '@storybook/vue';

configure(require.context('../src/renderer/components', true, /\.stories\.js$/), module);
