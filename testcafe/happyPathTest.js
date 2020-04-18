import { Selector } from 'testcafe';
import step from "./step";

const replaceText = { speed: 1, replace: true, paste: true };

fixture("Happy Path").page("http://localhost:3000");

test('Starting the simulation', async t => {
  await step("picking a scenario",
    t.click(".scenario[for=island_paradise]"));
  await step("the scenario is applied",
    t.click(".save-button")
      .expect(Selector(".load-text").value).contains("critter")
  );
  const loadTextField = await Selector('.load-text')();

  await step("the simulation runs, updating the world",
    t.wait(1200)
      .click(".save-button")
      .expect(Selector(".load-text").value).notEql(loadTextField.value)
  );
});