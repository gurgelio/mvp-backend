# frozen_string_literal: true

class StudentsController < ApplicationController
  before_action :set_student, only: %i[show update destroy]

  # GET /students
  def index
    authorize Student
    @students = policy_scope(Student).all

    render json: StudentBlueprint.render(@students)
  end

  # GET /students/1
  def show
    render json: StudentBlueprint.render(@student)
  end

  # POST /students
  def create
    authorize Student

    @student = Student.new(student_params)

    if @student.save
      render json: StudentBlueprint.render(@student), status: :created, location: @student
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /students/1
  def update
    authorize @student

    if @student.update(student_params)
      render json: @student
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  # DELETE /students/1
  def destroy
    authorize @student
    @student.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_student
    @student = policy_scope(Student).find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def student_params
    params.require(:student).permit(:name, :email, :phone_number, :teacher_id)
  end
end
