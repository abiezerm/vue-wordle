import { mount } from '@vue/test-utils';
import WordleBoard from '../WordleBoard.vue';
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings';

describe("WordleBoard", () => {
    let wordOfTheDay = "TEST";
    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
        wrapper = mount(WordleBoard, { props: { wordOfTheDay }});
    })

    test("a victory message appears when the user make a guess that match the word of the day", async() => {
        const guessInput = wrapper.find('input[type="text"]');
        await guessInput.setValue('TEST');
        await guessInput.trigger('keydown.enter');

        expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    })

    test("a defeat message appear if the user make a guess that is incorrect", async() => {
        const guessInput = wrapper.find('input[type="text"]');
        await guessInput.setValue('Wrong');
        await guessInput.trigger('keydown.enter');

        expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
    })
    test("no end-of-game appears if the user has not yet make a guess", async() => {
        expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
        expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    })
})