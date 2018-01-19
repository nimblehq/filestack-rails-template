require 'rails_helper'

RSpec.describe "users/new", type: :view do
  before(:each) do
    assign(:user, User.new(
      :nameL => "MyString",
      :email => "MyString",
      :picture => "MyString"
    ))
  end

  it "renders new user form" do
    render

    assert_select "form[action=?][method=?]", users_path, "post" do

      assert_select "input[name=?]", "user[nameL]"

      assert_select "input[name=?]", "user[email]"

      assert_select "input[name=?]", "user[picture]"
    end
  end
end
