import { mount } from '@vue/test-utils';
import WordleBoard from '../WordleBoard.vue';
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings';

describe("WordleBoard", () => {
    let wordOfTheDay = "TEST";
    let wrapper: ReturnType<typeof mount>;

    beforeEach(() => {
        wrapper = mount(WordleBoard, { props: { wordOfTheDay }});
    })

    async function playerSubmitGuess(guess: string) {
        const guessInput = wrapper.find('input[type="text"]');
        await guessInput.setValue(guess);
        await guessInput.trigger('keydown.enter');
    }

    test("a victory message appears when the user make a guess that match the word of the day", async() => {
        await playerSubmitGuess(wordOfTheDay);

        expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    })

    test("a defeat message appear if the user make a guess that is incorrect", async() => {
        await playerSubmitGuess('WRONG');

        expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
    })
    test("no end-of-game appears if the user has not yet make a guess", async() => {
        expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
        expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    })
})