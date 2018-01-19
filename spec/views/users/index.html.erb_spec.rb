require 'rails_helper'

RSpec.describe "users/index", type: :view do
  before(:each) do
    assign(:users, [
      User.create!(
        :nameL => "Name L",
        :email => "Email",
        :picture => "Picture"
      ),
      User.create!(
        :nameL => "Name L",
        :email => "Email",
        :picture => "Picture"
      )
    ])
  end

  it "renders a list of users" do
    render
    assert_select "tr>td", :text => "Name L".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Picture".to_s, :count => 2
  end
end
