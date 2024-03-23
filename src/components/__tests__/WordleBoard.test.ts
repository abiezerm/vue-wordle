import { mount } from '@vue/test-utils';
import { it, describe, expect } from "vitest";

import WordleBoard from '../WordleBoard.vue';

describe("WordleBoard", () => {
    it("renders the properly", () => {
        const msg = "hello vitest!";
        const wrapper = mount(WordleBoard, { props: { msg: msg } });

        expect(wrapper.text()).toContain(msg);
    });
});