import { mount } from '@vue/test-utils';
import WordleBoard from '../WordleBoard.vue';

describe("WordleBoard", () => {
    test("a victory message appears when the user make a guess that match the word of the day", async() => {
        //Arrange
        const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TEST" }});

        //Act
        const guessInput = wrapper.find('input[type="text"]');
        await guessInput.setValue('TEST');
        await guessInput.trigger('keydown.enter');

        //Assert
        expect(wrapper.text()).toContain('You won!');
    })
})