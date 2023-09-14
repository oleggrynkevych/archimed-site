
import React from 'react';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';
import classNames from 'classnames';

const CustomLink = React.forwardRef(({ to, children, ...props }, ref) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    const liClass = classNames({ active: isActive });
  
    return (
      <Link to={to} {...props}>
        <li ref={ref} className={liClass}>
          <span>{children}</span>
        </li>
      </Link>
    );
});

export default CustomLink;