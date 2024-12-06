# frozen_string_literal: true

class TeachersController < ApplicationController
  before_action :set_teacher, only: %i[show update destroy]

  # GET /teachers
  def index
    authorize Teacher
    @teachers = policy_scope(Teacher).all

    render json: @teachers
  end

  # GET /teachers/1
  def show
    authorize @teacher
    render json: @teacher
  end

  # POST /teachers
  def create
    authorize Teacher

    @teacher = Teacher.new(teacher_params)

    if @teacher.save
      render json: @teacher, status: :created, location: @teacher
    else
      render json: @teacher.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /teachers/1
  def update
    authorize @teacher

    if @teacher.update(teacher_params)
      render json: @teacher
    else
      render json: @teacher.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teachers/1
  def destroy
    authorize @teacher

    @teacher.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_teacher
    @teacher = policy_scope(Teacher).find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def teacher_params
    params.require(:teacher).permit(:name, :email, :phone_number)
  end
end
