import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";


const TimetableView = () => {
  const { palette } = useTheme();
  const td = styled('td')({
    border: '1px solid ' + palette.neutral.medium
  });
  return (
    <div className="flex-row justify-content-center">
      <table className="timetable">
        <tr className="day">
          <td></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
        <tr className="mon">
          <td>mon</td>
          <td className="_1"></td>
          <td className="_2">OS</td>
          <td className="_3">TFCS</td>
          <td className="_4" rowspan="6">Short break</td>
          <td className="_5">CN</td>
          <td className="_6">LA</td>
          <td className="_7" rowspan="6">Lunch break</td>
          <td className="_8"></td>
          <td className="_9"></td>
        </tr>
        <tr className="tue">
          <td>tue</td>
          <td className="_1"></td>
          <td className="_2">CN</td>
          <td className="_3">ADA</td>
          <td className="_5">OS</td>
          <td className="_6">TFCS</td>
          <td className="_8">LA</td>
          <td className="_9"></td>
        </tr>
        <tr className="wed">
          <td>wed</td>
          <td className="_1"></td>
          <td className="_2">UHV</td>
          <td className="_3">UHV</td>
          <td className="_5">OS LAB</td>
          <td className="_6">OS LAB</td>
          <td className="_8">TFCS TUT</td>
          <td className="_9">TFCS TUT</td>
        </tr>
        <tr className="thu">
          <td>thu</td>
          <td className="_1"></td>
          <td className="_2">CN LAB</td>
          <td className="_3">CN LAB</td>
          <td className="_5">ADA</td>
          <td className="_6">OS</td>
          <td className="_8">ADA LAB</td>
          <td className="_9">ADA LAB</td>
        </tr>
        <tr className="fri">
          <td>fri</td>
          <td className="_1"></td>
          <td className="_2"></td>
          <td className="_3">CN</td>
          <td className="_5">DEVOPS</td>
          <td className="_6">DEVOPS</td>
          <td className="_8"></td>
          <td className="_9"></td>
        </tr>
        <tr className="sat">
          <td>sat</td>
          <td className="_1"></td>
          <td className="_2">LA TUT</td>
          <td className="_3">LA TUT</td>
          <td className="_5">ADA</td>
          <td className="_6">KAN</td>
          <td className="_8"></td>
          <td className="_9"></td>
        </tr>
      </table>
    </div>
  )
}

export default TimetableView;