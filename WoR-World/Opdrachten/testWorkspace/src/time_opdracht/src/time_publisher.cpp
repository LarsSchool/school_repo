#include <chrono>
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "time_opdracht/msg/time_msg.hpp"
#include "time_opdracht/srv/service_types.hpp"

using namespace std::chrono_literals;

class TimePublisher : public rclcpp::Node
{
public:
    TimePublisher()
        : Node("time_publisher")
    {
        time_publisher = create_publisher<time_opdracht::msg::TimeMsg>("Time_topic", 10);

        service_ = create_service<time_opdracht::srv::ServiceTypes>(
            "onOff", std::bind(&TimePublisher::add, this, std::placeholders::_1, std::placeholders::_2));

        timer_ = create_wall_timer(1s, std::bind(&TimePublisher::publish_time, this));
    }

private:
    bool enabled = true;

    void publish_time()
    {
        if (!enabled)
        {
            return;
        }
        else
        {
            auto message = time_opdracht::msg::TimeMsg();
            time_t now = time(0);
            tm *ltm = localtime(&now);
            message.hours = ltm->tm_hour;
            message.minutes = ltm->tm_min;
            message.seconds = ltm->tm_sec;

            std::cout << "\nPublishing Time Message: \nHours: " << message.hours << "\nMinutes: " << message.minutes << "\nseconds: " << message.seconds << std::endl;
            time_publisher->publish(message);
        }
    }

    void add(const std::shared_ptr<time_opdracht::srv::ServiceTypes::Request> request,
             std::shared_ptr<time_opdracht::srv::ServiceTypes::Response> response)
    {
        RCLCPP_INFO(this->get_logger(), "Incoming request: %s", request->command.c_str());

        if (request->command == "on" && !enabled)
        {
            enabled = true;
            response->text = "TimePublisher turned on.";
            RCLCPP_INFO(this->get_logger(), "TimePublisher turned on.");
        }
        else if (request->command == "off" && enabled)
        {
            enabled = false;
            response->text = "TimePublisher turned off.";
            RCLCPP_INFO(this->get_logger(), "TimePublisher turned off.");
        }
        else
        {
            response->text = "ERROR! Enter 'on' or 'off', else it won't recognize.";
            RCLCPP_WARN(this->get_logger(), "Invalid command: %s", request->command.c_str());
        }
    }

    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<time_opdracht::msg::TimeMsg>::SharedPtr time_publisher;
    rclcpp::Service<time_opdracht::srv::ServiceTypes>::SharedPtr service_;
};

int main(int argc, char *argv[])
{
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<TimePublisher>());
    rclcpp::shutdown();

    return 0;
}
