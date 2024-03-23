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

    describe("End of the game messages", () => {
        test("A victory message appears when the user make a guess that match the word of the day", async() => {
            await playerSubmitGuess(wordOfTheDay);
    
            expect(wrapper.text()).toContain(VICTORY_MESSAGE);
        })
    
        test("A defeat message appear if the user make a guess that is incorrect", async() => {
            await playerSubmitGuess('WRONG');
    
            expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
        })
    
        test("No end-of-game appears if the user has not yet make a guess", async() => {
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
        })
    })

    describe("Rules for defining the word of the day", () => {
        test("If a word of the day does not have 5 letters, a warning is emitted", async() => {
            console.warn = vi.fn();
    
            wrapper = mount(WordleBoard, { props: { wordOfTheDay: "FLY" }});
    
            expect(console.warn).toHaveBeenCalled();
        })
    
        test("If the word of the day is not all in uppercase, a warning is emitted", async() => {
            console.warn = vi.fn();
    
            wrapper = mount(WordleBoard, { props: { wordOfTheDay: "tests" }});
    
            expect(console.warn).toHaveBeenCalled();
        })
    
        test("If the word of the day is not a english word, a warning is emitted", async() => {
            console.warn = vi.fn();
    
            wrapper = mount(WordleBoard, { props: { wordOfTheDay: "QRTTD" }});
    
            expect(console.warn).toHaveBeenCalled();
        })
    
        test("No warning is emitted if the world of the day is a real uppercase english world with 5 characters", async() => {
            console.warn = vi.fn();
    
            wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }});
    
            expect(console.warn).not.toHaveBeenCalled();
        })
    })
    
    describe("Player input", () => {
        test.todo("Player guesses are limited to 5 letters")
        test.todo("Player guesses can only be submitted if they are real english words")
        test.todo("Player guesses are not case-sensitive")
        test.todo("Player guesses can only contains letters")
    }) 
})