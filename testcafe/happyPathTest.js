import { Selector } from 'testcafe';
import step from "./step";

const replaceText = { speed: 1, replace: true, paste: true };

fixture("Happy Path").page("http://localhost:3000");

test('Starting the simulation', async t => {
  await step("starting the simulation",
    t.click("#runCode")
      .click("#pause-button")
      .wait(100)
  );
  await step("saving",
    t.click(".save-button")
      .expect(Selector(".load-text").value).contains("critter")
  );

});