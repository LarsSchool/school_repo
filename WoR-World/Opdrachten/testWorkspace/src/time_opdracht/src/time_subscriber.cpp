#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "time_opdracht/msg/time_msg.hpp"

class MinimalTimeSubscriber : public rclcpp::Node
{
public:
  MinimalTimeSubscriber()
  : Node("time_subscriber")
  {
    auto topic_callback =
      [this](time_opdracht::msg::TimeMsg::UniquePtr msg) -> void {
        std::cout << "\nHours: " << msg->hours << "\nMinutes: " << msg->minutes << "\nSeconds: " << msg->seconds << std::endl;
        // RCLCPP_INFO(this->get_logger(), incoming_message.c_str());
      };
    subscription_ =
      this->create_subscription<time_opdracht::msg::TimeMsg>("Time_topic", 10, topic_callback);
  }

private:
  rclcpp::Subscription<time_opdracht::msg::TimeMsg>::SharedPtr subscription_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalTimeSubscriber>());
  rclcpp::shutdown();
  return 0;
}
