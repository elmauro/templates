class UsersController < ApplicationController
  before_action :get_user, except: [:index, :create, :send_email]
  respond_to :html, :json

  require 'sendgrid-ruby'

  def index
    @user = User.all
    respond_with(@users) do |format|
      format.json { render :json => @user.as_json }
      format.html
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :no_content}
    end
  end      

  def show
    respond_with(@user.as_json)
  end

  def update
    if @user.update_attributes(user_params)
      render json: @user.as_json, status: :ok 
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :ok}
  end

  def send_email
    @user = User.where(email: params[:email]).first

    client = SendGrid::Client.new(api_user: 'elmauro78', api_key: 'Maurici*c1978')

    email = SendGrid::Mail.new do |m|
      m.to      = @user.email
      m.from    = 'mauricio.cadavid@yuxipacific.com'
      m.subject = 'Testing Templates Application'
      m.html    = 'and easy to do anywhere, even with Ruby'
      m.add_attachment('/Users/mauricio.cadavid/Downloads/' + @user.email + '.pdf', @user.email + '.pdf')
    end

    client.send(email)

    render json: {status: :ok}
  end

  private

  def user_params
    params.fetch(:user, {}).permit(:first_name, :last_name, :email, :phone)
  end

  def get_user
    @user = User.find(params[:id])
    render json: {status: :not_found} unless @user
  end

end