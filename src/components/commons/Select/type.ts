
export interface OptionProps {
    value: any;
    label: string;
    selected?: boolean
    onSelect?: (value: any, label: string) => void;
}

export interface SelectProps {
    label?: string;
    placeholder?: string;
    value: any;
    options?: Array<OptionProps>
    onSelect?: (value: any) => void;
    isMultiple?: boolean;
    className?: string;
}


  // Select.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   value: PropTypes.any,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.any.isRequired,
//     })
//   ),
//   onSelect: PropTypes.func.isRequired,
//   isMultiple: PropTypes.bool,
//   className: PropTypes.string,
// };