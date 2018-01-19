require 'rails_helper'

RSpec.describe "users/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :nameL => "Name L",
      :email => "Email",
      :picture => "Picture"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name L/)
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/Picture/)
  end
end
