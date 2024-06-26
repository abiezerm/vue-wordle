import { mount } from '@vue/test-utils';
import WordleBoard from '../WordleBoard.vue';
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from '@/settings';

describe("WordleBoard", () => {
    const wordOfTheDay = "TESTS";
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

        beforeEach(() => {
            console.warn = vi.fn();
        })

        test.each([
            { wordOfTheDay: "FLY", reason: "word-of-the-day must have 5 characters" },
            { wordOfTheDay: "tests", reason: "word-of-the-day must be all in uppercase" },
            { wordOfTheDay: "QRTTD", reason: "word-of-the-day must be a valid english word" },
        ])
        ("since $reason: $wordOfTheDay is invalid, therefor a warning is emitted", async({wordOfTheDay}) => {
            wrapper = mount(WordleBoard, { props: { wordOfTheDay }});
    
            expect(console.warn).toHaveBeenCalled();
        })
    
        test("No warning is emitted if the world of the day is a real uppercase english world with 5 characters", async() => {
            wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }});
    
            expect(console.warn).not.toHaveBeenCalled();
        })
    })
    
    describe("Player input", () => {
        test(`Player guesses are limited to ${WORD_SIZE} letters`, async() => {
            await playerSubmitGuess(wordOfTheDay + "EXTRA")

            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test(`Player guesses can only be submitted if they are real english words`, async() => {
            await playerSubmitGuess("QRTTD")

            expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
        })

        test("Player guesses are not case-sensitive", async() => {
            await playerSubmitGuess(wordOfTheDay.toLowerCase())

            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test("Player guesses can only contains letters", async() => {
            await playerSubmitGuess("H3!RT")

            expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('HRT')
        })

        test(`Non-letter characters are not render on the screen while been typed`, async() => {
            await playerSubmitGuess("12")
            await playerSubmitGuess("123")

            expect(wrapper.find<HTMLInputElement>('input[type="text"]').element.value).toEqual('')
        })
    }) 
})
