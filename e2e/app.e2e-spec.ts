import { AppPage } from './app.po';

describe('angular2-test-task App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('UBI ELECTRICITY');
  });
});
