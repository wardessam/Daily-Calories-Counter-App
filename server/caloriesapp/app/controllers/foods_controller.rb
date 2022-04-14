class FoodsController < ApplicationController
  before_action :set_food, only: %i[ show update destroy ]

  # GET /foods
  # GET /foods.json
  def index
    @foods = Food.all
    if @foods
      render json:@foods
   
    else
      render json: {
      status: 500,
      errors: ['no users found']
       }
     end
  end

  # GET /foods/1
  # GET /foods/1.json
  def show
  end

  # POST /foods
  # POST /foods.json
  
  def create
    @food = Food.new(food_params)

    if @food.save
      render :show, status: :created, location: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foods/1
  # PATCH/PUT /foods/1.json
  def update
    if @food.update(food_params)
      render :show, status: :ok, location: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foods/1
  # DELETE /foods/1.json
  def destroy
    @food.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food
      @food = Food.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def food_params
      params.require(:food).permit(:name, :picture,:calories,:servingQuantity)
    end
end
