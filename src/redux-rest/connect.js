import { connect } from 'react-redux'

const rrConnect = (api, mapStateToProps, mapDispatchToProps) => {

    const mapStateToPropsWrapper = (state) => {
        const retrieve = {};
        Object.keys(api).forEach((apiCall)=>{
            retrieve[apiCall] = api[apiCall].retrieve(state)
        });
        if (mapStateToProps instanceof Function){
            return {retrieve, ...mapStateToProps(state)};
        } else {
            return {retrieve};
        }
    };

    const mapDispatchToPropsWrapper = (dispatch) => {
        const request = {};
        Object.keys(api).forEach((apiCall)=>{
            request[apiCall] = (...args) => dispatch(api[apiCall].request(...args));
        });
        if (mapDispatchToProps instanceof Function){
            return {request, ...mapDispatchToProps(dispatch)};
        } else {
            return {request};
        }
    };

    return connect(mapStateToPropsWrapper, mapDispatchToPropsWrapper);
};

export default rrConnect;