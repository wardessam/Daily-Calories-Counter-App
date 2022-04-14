require "test_helper"

class FoodsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @food = foods(:one)
  end

  test "should get index" do
    get foods_url, as: :json
    assert_response :success
  end

  test "should create food" do
    assert_difference("Food.count") do
      post foods_url, params: { food: { name: @food.name, picture: @food.picture } }, as: :json
    end

    assert_response :created
  end

  test "should show food" do
    get food_url(@food), as: :json
    assert_response :success
  end

  test "should update food" do
    patch food_url(@food), params: { food: { name: @food.name, picture: @food.picture } }, as: :json
    assert_response :success
  end

  test "should destroy food" do
    assert_difference("Food.count", -1) do
      delete food_url(@food), as: :json
    end

    assert_response :no_content
  end
end
