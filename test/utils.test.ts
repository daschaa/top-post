import {getItem} from "../src/utils";
import axios from "axios";

jest.mock('axios');

describe("Utils", () => {
    describe("Get item", () => {
        it('should call axios url with item id', async () => {
            await getItem("some_id");
            expect(axios.get).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/item/some_id.json");
        });
    })
})